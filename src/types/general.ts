import grpc, { ChannelCredentials, Client } from "@grpc/grpc-js";
import * as grpcLoader from "@grpc/proto-loader";

export type GrpcLoader = typeof grpcLoader;

export type Grpc = typeof grpc;

export interface JsonBuffer {
  type: "Buffer";
  data: number[];
}

export interface NestedGrpcObject {
  [index: string]: {
    [index: string]: typeof Client;
  };
}

export interface ConnectionConfig {
  grpcPkgObj: NestedGrpcObject;
  server: string;
  credentials: ChannelCredentials;
}

export interface GrpcServiceConfig extends ConnectionConfig {
  service: any;
  subscriptionMethods?: string[];
}

export interface GrpcObjectConfig {
  protoFilePath: string;
  includeDirs?: string[];
  grpcLoader: GrpcLoader;
  grpc: Grpc;
  includeDefaults?: boolean;
}

export interface RpcClientConfig {
  server?: string; // URL for the lightning node to connect to ie. localhost:10009
  tls?: string | false; // /path/to/tls.cert or false to disable certificate pinning
  cert?: Buffer | string | JsonBuffer; // string or buffer representation of tls.cert
  macaroonPath?: string;
  macaroon?: Buffer | string | JsonBuffer; // hex-encoded string of macaroon file
  certEncoding?: string; // Default to utf-8
  grpcLoader?: GrpcLoader;
  grpc?: Grpc;
  includeDefaults?: boolean; // Whether default values should be included in gRPC responses. Defaults to false.
}

export interface AutopilotRpcClientConfig extends RpcClientConfig {
  autopilot?: any;
}

export interface ChainRpcClientConfig extends RpcClientConfig {
  chainNotifier?: any;
}

export interface InvoicesRpcClientConfig extends RpcClientConfig {
  invoices?: any;
}

export interface RouterRpcClientConfig extends RpcClientConfig {
  router?: any;
}

export interface SignRpcClientConfig extends RpcClientConfig {
  signer?: any;
}

export interface WalletRpcClientConfig extends RpcClientConfig {
  walletKit?: any;
}

export interface WatchtowerRpcClientConfig extends RpcClientConfig {
  watchtower?: any;
}

export interface WtClientRpcClientConfig extends RpcClientConfig {
  watchtowerClient?: any;
}

export interface LnRpcClientConfig extends RpcClientConfig {
  lightning?: any;
  walletUnlocker?: any;
}
