import assert from "assert";
import fs from "fs";
import { join } from "path";
import pkgDir from "pkg-dir";
import { promisify } from "util";
import packageJson from "../../package.json";
import { createSignRpc } from "../../src";
import { GrpcLoader } from "../../src/types";
import { grpcStub, SignerStub } from "../helpers/grpc-stub";

const { equal, fail } = assert;
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

describe("SignRpc Factory", () => {
  const certStub = "cert";

  describe("TLS settings", () => {
    it("should throw an error when tls file not found", () =>
      createSignRpc({ tls: "./not-a-file.cert" })
        .then(() => fail("failed to reject invalid SSL cert"))
        .catch((e) => assert(e, "SSL cert not found")));

    it("should use configured `cert` over `tls` when provided", () => {
      const expected = Buffer.from("cert");

      return createSignRpc({
        cert: expected.toString(),
        tls: "not-expected",
        grpc: grpcStub({
          credentials: {
            createSsl: (actual) => {
              assert(actual instanceof Buffer, "cert is a Buffer instance");

              equal(
                actual.toString(),
                expected.toString(),
                "configures bufferized `cert` value"
              );
            },
          },
        }),
      });
    });

    it("should use configured `tls` when provided", (done) => {
      const expected = "test-tls.cert";

      createSignRpc<any>({
        tls: expected,
        grpc: grpcStub({
          credentials: {
            createSsl: (actual) => {
              equal(actual, expected, "configures provided `tls` value");
            },
          },
          loadPackageDefinition: () => {
            throw new Error("force error");
          },
        }),
      })
        .then(fail)
        .catch(() => done());
    });

    it("should default to a system lnd SSL cert when unconfigured", (done) => {
      createSignRpc<any>({
        grpc: grpcStub({
          credentials: {
            createSsl: (cert) => {
              assert(/lnd\.conf$/.test(cert), "used system SSL cert file path");
            },
          },
          loadPackageDefinition: () => {
            throw new Error("force error");
          },
        }),
      })
        .then(fail)
        .catch(() => done());
    });

    it("should allow opting out of certificate pinning", (done) => {
      createSignRpc<any>({
        tls: false, // opt out
        grpc: grpcStub({
          credentials: {
            createSsl: (cert) => {
              assert(
                typeof cert === "undefined",
                "opted out of SSL cert pinning"
              );
            },
          },
          loadPackageDefinition: () => {
            throw new Error("force error");
          },
        }),
      })
        .then(fail)
        .catch(() => done());
    });

    it("should combine credentials when macaroon present", async () => {
      let tests = 0;
      const expSslCreds = {};
      const expMacaroonCreds = {};

      try {
        await createSignRpc({
          cert: "123",
          macaroon: "746573740a",
          grpc: grpcStub({
            credentials: {
              createSsl: () => expSslCreds,
              createFromMetadataGenerator: (cb) => {
                cb({}, () => {
                  /* noop */
                });
                return expMacaroonCreds;
              },
              combineChannelCredentials: (sslCreds, macaroonCreds) => {
                equal(sslCreds, expSslCreds, "has expected ssl credentials");
                equal(
                  macaroonCreds,
                  expMacaroonCreds,
                  "has expected macaroon credentials"
                );
                tests++;
              },
            },
            loadPackageDefinition: () => {
              throw new Error("force error");
            },
          }),
        });
      } catch (e) {
        /* noop */
      }

      equal(tests, 1, "called `combineChannelCredentials`");
    });
  });

  describe("macaroon settings", () => {
    let macaroonDest;
    const macaroonTxt = "test";
    const macaroonHex = "74657374";

    before(async () => {
      const root = await pkgDir(__dirname);
      macaroonDest = join(root, "test.macaroon");
      await writeFile(macaroonDest, macaroonTxt, "utf8");
    });

    after(async () => {
      await unlink(macaroonDest);
    });

    it("should set hex encoded macaroon from `macaroonPath`", async () => {
      let tests = 0;

      const CustomMetadataStub = () => {
        /* noop */
      };
      CustomMetadataStub.prototype.add = (_, macaroon) => {
        tests++;
        equal(macaroon, macaroonHex);
      };

      try {
        await createSignRpc({
          cert: "123",
          macaroonPath: macaroonDest,
          grpc: grpcStub({
            Metadata: CustomMetadataStub,
            loadPackageDefinition: () => {
              throw new Error("force error");
            },
          }),
        });
      } catch (e) {
        /* noop */
      }

      equal(tests, 1, "called Metadata.add with macaroon");
    });

    it("should set macaroon from `macaroon` hex string", async () => {
      let tests = 0;

      const CustomMetadataStub = () => {
        /* noop */
      };
      CustomMetadataStub.prototype.add = (_, macaroon) => {
        tests++;
        equal(macaroon, macaroonHex);
      };

      try {
        await createSignRpc({
          cert: "123",
          macaroon: macaroonHex,
          grpc: grpcStub({
            Metadata: CustomMetadataStub,
            loadPackageDefinition: () => {
              throw new Error("force error");
            },
          }),
        });
      } catch (e) {
        /* noop */
      }

      equal(tests, 1, "called Metadata.add with macaroon");
    });
  });

  describe("grpc lnd/proto instantiation", () => {
    // eslint-disable-next-line max-len
    it("should load `./lnd/lnd_version/signrpc/signer.proto` filename via `grpc.loadSync()`", async () => {
      const root = await pkgDir(__dirname);
      const expected = join(
        root,
        `lnd/${packageJson.config["releasetag"]}/signrpc/signer.proto`
      );

      return createSignRpc({
        grpcLoader: {
          loadSync(actual) {
            equal(actual, expected, "loaded generated `signer.proto` via load");
            return {};
          },
        } as unknown as GrpcLoader,
        grpc: grpcStub(),
        cert: certStub,
      });
    });

    it("should default to server `localhost:10001`", () => {
      const expected = "localhost:10001";

      return createSignRpc({
        grpc: grpcStub({}, (actual) => {
          equal(actual, expected, "defaults to expected server");
          return new SignerStub();
        }),
        cert: certStub,
      });
    });

    it("should connect to a configured server address", () => {
      const expected = "localhost:30001";

      return createSignRpc({
        server: expected,
        grpc: grpcStub({}, (actual) => {
          equal(actual, expected, "recieved configured server");
          return new SignerStub();
        }),
        cert: certStub,
      });
    });
  });

  describe("proxy instance", () => {
    it("should provide access to GRPC Package Definition", () => {
      return createSignRpc<{ description: object }>({
        grpc: grpcStub(),
        cert: certStub,
      }).then((signrpc) => {
        equal(typeof signrpc.description, "object");
      });
    });

    it("should provide access to the signer instance", () => {
      const expected = {};
      return createSignRpc<{ signer: object }>({
        grpc: grpcStub(),
        signer: expected,
        cert: certStub,
      }).then((signrpc) => {
        equal(signrpc.signer, expected);
      });
    });

    it("should provide all signer methods top-level", () => {
      return createSignRpc<{ test: () => void }>({
        grpc: grpcStub(),
        signer: {
          test: () => {
            /* noop */
          },
        },
        cert: certStub,
      }).then((signrpc) => {
        equal(typeof signrpc.test, "function");
      });
    });
  });
});

process.on("unhandledRejection", () => {
  /* noop */
});
