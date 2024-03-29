import { Readable } from "../streams";
import { Invoice, RouteHint } from "./ln-rpc";
import { JsonBuffer } from "../general";

export enum LookupModifier {
  DEFAULT = 0,
  HTLC_SET_ONLY = 1,
  HTLC_SET_BLANK = 2,
}

export interface SubscribeSingleInvoiceRequest {
  rHash: Buffer | string | JsonBuffer;
}

export interface CancelInvoiceMsg {
  paymentHash: Buffer | string | JsonBuffer;
}

export interface AddHoldInvoiceRequest {
  memo?: string;
  hash?: Buffer | string | JsonBuffer;
  value?: number;
  valueMsat?: number;
  descriptionHash?: Buffer | string | JsonBuffer;
  expiry?: number;
  fallbackAddr?: string;
  cltvExpiry?: number;
  routeHints?: RouteHint[];
  private?: boolean;
}

export interface AddHoldInvoiceResp {
  paymentRequest: string;
}

export interface SettleInvoiceMsg {
  preimage: Buffer | string | JsonBuffer;
}

export interface LookupInvoiceMsg {
  paymentHash: Buffer | string | JsonBuffer;
  paymentAddr: Buffer | string | JsonBuffer;
  setId: Buffer | string | JsonBuffer;
  lookupModifier: LookupModifier;
}

/**
 * LND Invoices gRPC API Client
 */
export interface InvoicesRpc {
  /**
   * subscribeSingleInvoice returns a uni-directional stream (server -> client)
   * to notify the client of state transitions of the specified invoice.
   * Initially the current invoice state is always sent out.
   */
  subscribeSingleInvoice(
    args: SubscribeSingleInvoiceRequest
  ): Readable<Invoice>;

  /**
   * cancelInvoice cancels a currently open invoice. If the invoice is already
   * canceled, this call will succeed. If the invoice is already settled, it will
   * fail.
   */
  cancelInvoice(args: CancelInvoiceMsg): Promise<{}>;

  /**
   * addHoldInvoice creates a hold invoice. It ties the invoice to the hash
   * supplied in the request.
   */
  addHoldInvoice(args: AddHoldInvoiceRequest): Promise<AddHoldInvoiceResp>;

  /**
   * settleInvoice settles an accepted invoice. If the invoice is already
   * settled, this call will succeed.
   */
  settleInvoice(args: SettleInvoiceMsg): Promise<{}>;

  /*
    LookupInvoiceV2 attempts to look up at invoice. An invoice can be refrenced
    using either its payment hash, payment address, or set ID.
    */
  LookupInvoiceV2(args: LookupInvoiceMsg): Promise<Invoice>;
}
