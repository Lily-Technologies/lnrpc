import { join } from "path";
import pkgDir from "pkg-dir";
import packageJson from "../../package.json";
import { createInvoices } from "../services";
import { InvoicesRpc, InvoicesRpcClientConfig } from "../types";
import { createCredentials } from "./create-credentials";
import { createGrpcObject } from "./create-grpc-object";
import { defaults } from "./defaults";

/**
 * Factory for a invoicesrpc instance & proxy responsible for:
 *  - Generating a GRPC Descriptor from user's config
 *  - Instantiating/exposing all GRPC Services
 *  - Resolving a proxy that:
 *    1.  Invokes all top-level method calls to the lightning
 *        proxy for user convience
 *    2.  Allow basic user property requests to all GRPC Services
 *
 * @param userConfig The user provided configuration details
 * @return Returns proxy to invoicesrpc instance
 */
export async function createInvoicesRpc<T = unknown>(
  userConfig: InvoicesRpcClientConfig
): Promise<T & InvoicesRpc> {
  const rootPath = await pkgDir(__dirname);
  const lndProtosRootPath = join(
    rootPath,
    `lnd/${packageJson.config["releasetag"]}`
  );
  const protoFilePath = join(lndProtosRootPath, "/invoicesrpc/invoices.proto");

  // Configuration options
  const config = {
    ...defaults,
    ...userConfig,
  };
  const { invoices, server, grpcLoader, grpc, includeDefaults } = config;

  // Generate grpc SSL credentials
  const credentials = await createCredentials(config);

  // Create RPC from proto and return GRPC
  const grpcPkgObj = createGrpcObject({
    includeDefaults,
    protoFilePath,
    grpcLoader,
    grpc,
    includeDirs: [lndProtosRootPath],
  });

  /**
   * Invoicesrpc instance
   */
  const invoicesrpc = Object.create(null, {
    description: { value: grpcPkgObj },
    invoices: {
      value:
        invoices ||
        createInvoices({
          grpcPkgObj,
          server,
          credentials,
        }),
    },
  });

  return new Proxy(invoicesrpc, {
    /**
     * Provide lop-level access to any invoices
     * methods, otherwise provide user with fallback value
     * @param target
     * @param key
     */
    get(target: any, key: string): any {
      if (typeof target.invoices[key] === "function") {
        return target.invoices[key].bind(target.invoices);
      } else {
        return target[key]; // forward
      }
    },
  });
}
