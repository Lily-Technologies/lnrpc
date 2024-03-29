import { Duplex, Readable } from "../streams";
import {
  Failure,
  FailureCode,
  FeatureBit,
  HTLCAttempt,
  Payment,
  Route,
  RouteHint,
  ChannelPoint,
} from "./ln-rpc";
import { JsonBuffer } from "../general";

export enum HtlcEventType {
  UNKNOWN = 0,
  SEND = 1,
  RECEIVE = 2,
  FORWARD = 3,
}

export interface ChanStatusAction {
  ENABLE: 0;
  DISABLE: 1;
  AUTO: 2;
}

export enum FailureDetail {
  UNKNOWN = 0,
  NO_DETAIL = 1,
  ONION_DECODE = 2,
  LINK_NOT_ELIGIBLE = 3,
  ON_CHAIN_TIMEOUT = 4,
  HTLC_EXCEEDS_MAX = 5,
  INSUFFICIENT_BALANCE = 6,
  INCOMPLETE_FORWARD = 7,
  HTLC_ADD_FAILED = 8,
  FORWARDS_DISABLED = 9,
  INVOICE_CANCELED = 10,
  INVOICE_UNDERPAID = 11,
  INVOICE_EXPIRY_TOO_SOON = 12,
  INVOICE_NOT_OPEN = 13,
  MPP_INVOICE_TIMEOUT = 14,
  ADDRESS_MISMATCH = 15,
  SET_TOTAL_MISMATCH = 16,
  SET_TOTAL_TOO_LOW = 17,
  SET_OVERPAID = 18,
  UNKNOWN_INVOICE = 19,
  INVALID_KEYSEND = 20,
  MPP_IN_PROGRESS = 21,
  CIRCULAR_ROUTE = 22,
}

export enum PaymentState {
  IN_FLIGHT = 0,
  SUCCEEDED = 1,
  FAILED_TIMEOUT = 2,
  FAILED_NO_ROUTE = 3,
  FAILED_ERROR = 4,
  FAILED_INCORRECT_PAYMENT_DETAILS = 5,
  FAILED_INSUFFICIENT_BALANCE = 6,
}

export enum ResolveHoldForwardAction {
  SETTLE = 0,
  FAIL = 1,
  RESUME = 2,
}

export interface SendPaymentRequest {
  dest?: Buffer | string | JsonBuffer;
  amt?: number;
  amtMsat?: number;
  paymentHash?: Buffer | string | JsonBuffer;
  finalCltvDelta?: number;
  paymentRequest?: string;
  timeoutSeconds?: number;
  feeLimitSat?: number;
  feeLimitMsat?: number;
  outgoingChanId?: string;
  outgoingChanIds?: number[];
  lastHopPubkey?: Buffer | string | JsonBuffer;
  cltvLimit?: number;
  routeHints?: RouteHint[];
  destCustomRecords?: Array<[number, Buffer]> | string[];
  allowSelfPayment?: boolean;
  destFeatures?: FeatureBit[];
  maxParts?: number;
  noInflightUpdates?: boolean;
}

export interface TrackPaymentRequest {
  paymentHash: Buffer | string | JsonBuffer;
  noInflightUpdates?: boolean;
}

export interface RouteFeeRequest {
  dest: Buffer | string | JsonBuffer;
  amtSat: number;
}

export interface RouteFeeResponse {
  routingFeeMsat: number;
  timeLockDelay: number;
}

export interface SendToRouteReq {
  paymentHash: Buffer | string | JsonBuffer;
  route?: Route;
}

export interface ChanUpdate {
  signature: Buffer | string | JsonBuffer;
  chainHash: Buffer | string | JsonBuffer;
  chanId: number;
  timestamp: number;
  messageFlags: number;
  channelFlags: number;
  timeLockDelta: number;
  htlcMinimumMsat: number;
  baseFee: number;
  feeRate: number;
  htlcMaximumMsat: number;
  extraOpaqueData: Buffer | string | JsonBuffer;
}

export interface SendToRouteResponse {
  preimage: Buffer | string | JsonBuffer;
  failure?: Failure;
}

export interface PairHistory {
  nodeFrom: Buffer | string | JsonBuffer;
  nodeTo: Buffer | string | JsonBuffer;
  history?: PairData;
}

export interface PairData {
  failTime?: number;
  failAmtSat?: number;
  failAmtMsat?: number;
  successTime?: number;
  successAmtSat?: number;
  successAmtMsat?: number;
}

export interface QueryProbabilityRequest {
  fromNode?: Buffer | string | JsonBuffer;
  toNode?: Buffer | string | JsonBuffer;
  amtMsat?: number;
}

export interface QueryProbabilityResponse {
  probability: number;
  history?: PairData;
}

export interface QueryMissionControlResponse {
  pairs: PairHistory[];
}

export interface BuildRouteRequest {
  amtMsat: number;
  finalCltvDelta?: number;
  outgoingChanId?: string;
  hopPubkeys: Array<Buffer | string>;
}

export interface BuildRouteResponse {
  route?: Route;
}

export interface HtlcInfo {
  incomingTimelock: number;
  outgoingTimelock: number;
  incomingAmtMsat: number;
  outgoingAmtMsat: number;
}

export interface ForwardEvent {
  info?: HtlcInfo;
}

export interface LinkFailEvent {
  info?: HtlcInfo;
  wireFailure: FailureCode;
  failureDetail: FailureDetail;
  failureString: string;
}

export interface HtlcEvent {
  incomingChannelId: number;
  outgoingChannelId: number;
  incomingHtlcId: number;
  outgoingHtlcId: number;
  timestampNs: number;
  eventType: HtlcEventType;
  forwardEvent?: ForwardEvent;
  forwardFailEvent?: {};
  settleEvent?: {};
  linkFailEvent?: LinkFailEvent;
}

export interface PaymentStatusUpdate {
  state: PaymentState;
  preimage?: Buffer | string | JsonBuffer;
  htlcs: HTLCAttempt[];
}

export interface CircuitKey {
  chanId?: number;
  htlcId?: number;
}

export interface UpdateChanStatusRequest {
  chanPoint?: ChannelPoint;
  action: ChanStatusAction;
}

export interface UpdateChanStatusResponse {}

export interface ForwardHtlcInterceptRequest {
  incomingCircuitKey?: CircuitKey;
  incomingAmountMsat?: number;
  incomingExpiry?: number;
  paymentHash?: Buffer | string | JsonBuffer;
  outgoingRequestedChanId?: number;
  outgoingAmountMsat?: number;
  outgoingExpiry?: number;
  customRecords?: Array<[number, Buffer | string]>;
}

export interface ForwardHtlcInterceptResponse {
  incomingCircuitKey?: CircuitKey;
  action: ResolveHoldForwardAction;
  preimage: Buffer | string | JsonBuffer;
}

/**
 * LND Router gRPC API Client
 */
export interface RouterRpc {
  /**
   * sendPaymentV2 attempts to route a payment described by the passed
   * PaymentRequest to the final destination. The call returns a stream of
   * payment updates.
   */
  sendPaymentV2(args: SendPaymentRequest): Readable<Payment>;

  /**
   * trackPaymentV2 returns an update stream for the payment identified by the
   * payment hash.
   */
  trackPaymentV2(args: TrackPaymentRequest): Readable<Payment>;

  /**
   * estimateRouteFee allows callers to obtain a lower bound w.r.t how much it
   * may cost to send an HTLC to the target end destination.
   */
  estimateRouteFee(args: RouteFeeRequest): Promise<RouteFeeResponse>;

  /**
   * sendToRoute attempts to make a payment via the specified route. This method
   * differs from SendPayment in that it allows users to specify a full route
   * manually. This can be used for things like rebalancing, and atomic swaps.
   */
  sendToRoute(args: SendToRouteReq): Promise<SendToRouteResponse>;

  /**
   * sendToRouteV2 attempts to make a payment via the specified route. This
   * method differs from SendPayment in that it allows users to specify a full
   * route manually. This can be used for things like rebalancing, and atomic
   * swaps.
   */
  sendToRouteV2(args: SendToRouteReq): Promise<HTLCAttempt>;

  /**
   * resetMissionControl clears all mission control state and starts with a clean
   * slate.
   */
  resetMissionControl(args?: {}): Promise<{}>;

  /**
   * queryMissionControl exposes the internal mission control state to callers.
   * It is a development feature.
   */
  queryMissionControl(args?: {}): Promise<QueryMissionControlResponse>;

  /**
   * queryProbability returns the current success probability estimate for a
   * given node pair and amount.
   */
  queryProbability(
    args: QueryProbabilityRequest
  ): Promise<QueryProbabilityResponse>;

  /**
   * buildRoute builds a fully specified route based on a list of hop public
   * keys. It retrieves the relevant channel policies from the graph in order to
   * calculate the correct fees and time locks.
   */
  buildRoute(args: BuildRouteRequest): Promise<BuildRouteResponse>;

  /**
   * subscribeHtlcEvents creates a uni-directional stream from the server to
   * the client which delivers a stream of htlc events.
   */
  subscribeHtlcEvents(args?: {}): Readable<HtlcEvent>;

  /**
   * Deprecated, use sendPaymentV2. sendPayment attempts to route a payment described
   * by the passed PaymentRequest to the final destination. The call returns a stream of
   * payment status updates.
   */
  sendPayment(args: SendPaymentRequest): Readable<PaymentStatusUpdate>;

  /**
   * Deprecated, use trackPaymentV2. trackPayment returns an update stream for the payment
   * identified by the payment hash.
   */
  trackPayment(args: TrackPaymentRequest): Readable<PaymentStatusUpdate>;

  /**
   * htlcInterceptor dispatches a bi-directional streaming RPC in which
   * Forwarded HTLC requests are sent to the client and the client responds with
   * a boolean that tells LND if this htlc should be intercepted.
   * In case of interception, the htlc can be either settled, cancelled or
   * resumed later by using the ResolveHoldForward endpoint.
   */
  htlcInterceptor(
    args?: ForwardHtlcInterceptRequest
  ): Duplex<ForwardHtlcInterceptResponse>;
}
