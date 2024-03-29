import { Duplex, Readable } from "../streams";
import { KeyDescriptor } from "./sign-rpc";
import { EstimateFeeResponse } from "./wallet-rpc";
import { JsonBuffer } from "../general";
import { DeleteMacaroonIDRequest } from "../generated/lightning_pb";

export enum AddressType {
  WITNESS_PUBKEY_HASH = 0,
  NESTED_PUBKEY_HASH = 1,
  UNUSED_WITNESS_PUBKEY_HASH = 2,
  UNUSED_NESTED_PUBKEY_HASH = 3,
}

export enum ClosureType {
  COOPERATIVE_CLOSE = 0,
  LOCAL_FORCE_CLOSE = 1,
  REMOTE_FORCE_CLOSE = 2,
  BREACH_CLOSE = 3,
  FUNDING_CANCELED = 4,
  ABANDONED = 5,
}

export enum SyncType {
  UNKNOWN_SYNC = 0,
  ACTIVE_SYNC = 1,
  PASSIVE_SYNC = 2,
  PINNED_SYNC = 3,
}

export enum UpdateType {
  OPEN_CHANNEL = 0,
  CLOSED_CHANNEL = 1,
  ACTIVE_CHANNEL = 2,
  INACTIVE_CHANNEL = 3,
  PENDING_OPEN_CHANNEL = 4,
  FULLY_RESOLVED_CHANNEL = 5,
}

export enum UpdateFailure {
  UPDATE_FAILURE_UNKNOWN = 0,
  UPDATE_FAILURE_PENDING = 1,
  UPDATE_FAILURE_NOT_FOUND = 2,
  UPDATE_FAILURE_INTERNAL_ERR = 3,
  UPDATE_FAILURE_INVALID_PARAMETER = 4,
}

export enum ChannelCase {
  CHANNEL_NOT_SET = 0,
  OPEN_CHANNEL = 1,
  CLOSED_CHANNEL = 2,
  ACTIVE_CHANNEL = 3,
  INACTIVE_CHANNEL = 4,
  PENDING_OPEN_CHANNEL = 6,
}

export enum InvoiceState {
  OPEN = 0,
  SETTLED = 1,
  CANCELED = 2,
  ACCEPTED = 3,
}

export enum BackupCase {
  BACKUP_NOT_SET = 0,
  CHAN_BACKUPS = 1,
  MULTI_CHAN_BACKUP = 2,
}

export enum PaymentStatus {
  UNKNOWN = 0,
  IN_FLIGHT = 1,
  SUCCEEDED = 2,
  FAILED = 3,
}

export enum LimitCase {
  LIMIT_NOT_SET = 0,
  FIXED = 1,
  FIXED_MSAT = 3,
  PERCENT = 2,
}

export enum FeatureBit {
  DATALOSS_PROTECT_REQ = 0,
  DATALOSS_PROTECT_OPT = 1,
  INITIAL_ROUING_SYNC = 3,
  UPFRONT_SHUTDOWN_SCRIPT_REQ = 4,
  UPFRONT_SHUTDOWN_SCRIPT_OPT = 5,
  GOSSIP_QUERIES_REQ = 6,
  GOSSIP_QUERIES_OPT = 7,
  TLV_ONION_REQ = 8,
  TLV_ONION_OPT = 9,
  EXT_GOSSIP_QUERIES_REQ = 10,
  EXT_GOSSIP_QUERIES_OPT = 11,
  STATIC_REMOTE_KEY_REQ = 12,
  STATIC_REMOTE_KEY_OPT = 13,
  PAYMENT_ADDR_REQ = 14,
  PAYMENT_ADDR_OPT = 15,
  MPP_REQ = 16,
  MPP_OPT = 17,
}

export enum PeerEventType {
  PEER_ONLINE = 0,
  PEER_OFFLINE = 1,
}

export enum ShimCase {
  SHIM_NOT_SET = 0,
  CHAN_POINT_SHIM = 1,
  PSBT_SHIM = 2,
}

export enum TriggerCase {
  TRIGGER_NOT_SET = 0,
  SHIM_REGISTER = 1,
  SHIM_CANCEL = 2,
  PSBT_VERIFY = 3,
  PSBT_FINALIZE = 4,
}

export enum HTLCStatus {
  IN_FLIGHT = 0,
  SUCCEEDED = 1,
  FAILED = 2,
}

export enum InvoiceHTLCState {
  ACCEPTED = 0,
  SETTLED = 1,
  CANCELED = 2,
}

export enum Initiator {
  INITIATOR_UNKNOWN = 0,
  INITIATOR_LOCAL = 1,
  INITIATOR_REMOTE = 2,
  INITIATOR_BOTH = 3,
}

export enum ResolutionType {
  TYPE_UNKNOWN = 0,
  ANCHOR = 1,
  INCOMING_HTLC = 2,
  OUTGOING_HTLC = 3,
  COMMIT = 4,
}

export enum ResolutionOutcome {
  OUTCOME_UNKNOWN = 0,
  CLAIMED = 1,
  UNCLAIMED = 2,
  ABANDONED = 3,
  FIRST_STAGE = 4,
  TIMEOUT = 5,
}

export enum CommitmentType {
  LEGACY = 0,
  STATIC_REMOTE_KEY = 1,
  ANCHORS = 2,
  UNKNOWN_COMMITMENT_TYPE = 999,
}

export enum AnchorState {
  LIMBO = 0,
  RECOVERED = 1,
  LOST = 2,
}

export enum NodeMetricType {
  UNKNOWN = 0,
  BETWEENNESS_CENTRALITY = 1,
}

export enum PaymentFailureReason {
  FAILURE_REASON_NONE = 0,
  FAILURE_REASON_TIMEOUT = 1,
  FAILURE_REASON_NO_ROUTE = 2,
  FAILURE_REASON_ERROR = 3,
  FAILURE_REASON_INCORRECT_PAYMENT_DETAILS = 4,
  FAILURE_REASON_INSUFFICIENT_BALANCE = 5,
}

export enum FailureCode {
  RESERVED = 0,
  INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS = 1,
  INCORRECT_PAYMENT_AMOUNT = 2,
  FINAL_INCORRECT_CLTV_EXPIRY = 3,
  FINAL_INCORRECT_HTLC_AMOUNT = 4,
  FINAL_EXPIRY_TOO_SOON = 5,
  INVALID_REALM = 6,
  EXPIRY_TOO_SOON = 7,
  INVALID_ONION_VERSION = 8,
  INVALID_ONION_HMAC = 9,
  INVALID_ONION_KEY = 10,
  AMOUNT_BELOW_MINIMUM = 11,
  FEE_INSUFFICIENT = 12,
  INCORRECT_CLTV_EXPIRY = 13,
  CHANNEL_DISABLED = 14,
  TEMPORARY_CHANNEL_FAILURE = 15,
  REQUIRED_NODE_FEATURE_MISSING = 16,
  REQUIRED_CHANNEL_FEATURE_MISSING = 17,
  UNKNOWN_NEXT_PEER = 18,
  TEMPORARY_NODE_FAILURE = 19,
  PERMANENT_NODE_FAILURE = 20,
  PERMANENT_CHANNEL_FAILURE = 21,
  EXPIRY_TOO_FAR = 22,
  MPP_TIMEOUT = 23,
  INVALID_ONION_PAYLOA = 24,
  INTERNAL_FAILURE = 997,
  UNKNOWN_FAILURE = 998,
  UNREADABLE_FAILURE = 999,
}

export interface Transaction {
  txHash: string;
  amount: string;
  numConfirmations: number;
  blockHash: string;
  blockHeight: number;
  timeStamp: string;
  totalFees: string;
  destAddresses: string[];
  rawTxHex: string;
  label?: string;
}

export interface LightningAddress {
  pubkey: string;
  host: string;
}

export interface TimestampedError {
  timestamp: number;
  error: string;
}

export interface Peer {
  pubKey: string;
  address: string;
  bytesSent: string;
  bytesRecv: string;
  satSent: string;
  satRecv: string;
  inbound: boolean;
  pingTime: string;
  syncType: SyncType;
  features?: Array<[number, Feature]>;
  errors?: TimestampedError[];
  flapCount: number;
  lastFlapNs: number;
  lastPingPayload: Buffer | string | JsonBuffer;
}

export interface PeerEvent {
  pubKey: string;
  type: PeerEventType;
}

export interface PendingHTLC {
  incoming: boolean;
  amount: string;
  outpoint: string;
  maturityHeight: number;
  blocksTilMaturity: number;
  stage: number;
}

export interface HTLC {
  incoming: boolean;
  amount: string;
  hashLock: Buffer | string | JsonBuffer;
  expirationHeight: number;
  htlcIndex: number;
  forwardingChannel: number;
  forwardingHtlcIndex: number;
}

export interface PendingChannel {
  remoteNodePub: string;
  channelPoint: string;
  capacity: string;
  localBalance: string;
  remoteBalance: string;
  localChanReserveSat: string;
  remoteChanReserveSat: string;
  initiator: Initiator;
  commitmentType: CommitmentType;
  numForwardingPackages: number;
}

export interface PendingOpenChannel {
  channel?: PendingChannel;
  confirmationHeight: number;
  commitFee: string;
  commitWeight: string;
  feePerKw: string;
}

export interface ClosedChannel {
  channel?: PendingChannel;
  closingTxid: string;
}

export interface ForceClosedChannel {
  channel?: PendingChannel;
  closingTxid: string;
  limboBalance: string;
  maturityHeight: number;
  blocksTilMaturity: number;
  recoveredBalance: string;
  pendingHtlcs: PendingHTLC[];
  anchor: AnchorState;
}

export interface Commitments {
  localTxid: string;
  remoteTxid: string;
  remotePendingTxid: string;
  localCommitFeeSat: number;
  remoteCommitFeeSat: number;
  remotePendingCommitFeeSat: number;
}

export interface WaitingCloseChannel {
  channel?: PendingChannel;
  limboBalance: string;
  commitments?: Commitments;
}

export interface ChannelConstraints {
  csvDelay: number;
  chanReserveSat: number;
  dustLimitSat: number;
  maxPendingAmtMsat: number;
  minHtlcMsat: number;
  maxAcceptedHtlcs: number;
}

export interface Channel {
  active: boolean;
  remotePubkey: string;
  channelPoint: string;
  chanId: string;
  capacity: string;
  localBalance: string;
  remoteBalance: string;
  commitFee: string;
  commitWeight: string;
  feePerKw: string;
  unsettledBalance: string;
  totalSatoshisSent: string;
  totalSatoshisReceived: string;
  numUpdates: string;
  pendingHtlcs: HTLC[];
  csvDelay: number;
  private: boolean;
  initiator: boolean;
  chanStatusFlags: string;
  localChanReserveSat: string;
  remoteChanReserveSat: string;
  staticRemoteKey: boolean;
  commitmentType: CommitmentType;
  lifetime: number;
  uptime: number;
  closeAddress: string;
  pushAmountSat: number;
  thawHeight: number;
  localConstraints?: ChannelConstraints;
  remoteConstraints?: ChannelConstraints;
}

export interface Resolution {
  resolutionType: ResolutionType;
  outcome: ResolutionOutcome;
  outpoint?: OutPoint;
  amountSat: number;
  sweepTxid: string;
}

export interface ChannelCloseSummary {
  channelPoint: string;
  chanId: string;
  chainHash: string;
  closingTxHash: string;
  remotePubkey: string;
  capacity: string;
  closeHeight: number;
  settledBalance: string;
  timeLockedBalance: string;
  closeType: ClosureType;
  openInitiator: Initiator;
  closeInitiator: Initiator;
  resolutions: Resolution[];
}

export interface FeeLimit {
  fixed?: string;
  fixedMsat?: number;
  percent?: string;
}

export interface Hop {
  chanId: string;
  chanCapacity: string;
  amtToForward: string;
  fee: string;
  expiry: number;
  amtToForwardMsat: string;
  feeMsat: string;
  pubKey: string;
  tlvPayload?: boolean;
  mppRecord?: MPPRecord;
  ampRecord?: AMPRecord;
  customRecords?: Array<[number, Buffer]> | Array<[string]>;
}

export interface MPPRecord {
  paymentAddr?: Buffer | string | JsonBuffer;
  totalAmtMsat?: number;
}

export interface AMPRecord {
  rootShare: Buffer | string | JsonBuffer;
  setId: Buffer | string | JsonBuffer;
  childIndex: number;
}

export interface Route {
  totalTimeLock: number;
  totalFees: string;
  totalAmt: string;
  hops: Hop[];
  totalFeesMsat: string;
  totalAmtMsat: string;
}

export interface HopHint {
  nodeId: string;
  chanId: string;
  feeBaseMsat: number;
  feeProportionalMillionths: number;
  cltvExpiryDelta: number;
}

export interface RouteHint {
  hopHints: HopHint[];
}

export interface Payment {
  paymentHash: string;
  value: string;
  creationDate: string;
  fee: string;
  paymentPreimage: string;
  valueSat: string;
  valueMsat: string;
  paymentRequest: string;
  status: PaymentStatus;
  feeSat: string;
  feeMsat: string;
  creationTimeNs?: string;
  htlcs?: HTLCAttempt[];
  paymentIndex: number;
  failureReason?: PaymentFailureReason;
}

export interface ChannelUpdate {
  signature: Buffer | string | JsonBuffer;
  chainHash: Buffer | string | JsonBuffer;
  chanId: string;
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

export interface Failure {
  code: FailureCode;
  channelUpdate?: ChannelUpdate;
  htlcMsat: number;
  onionSha256: Buffer | string | JsonBuffer;
  cltvExpiry: number;
  flags: number;
  failureSourceIndex: number;
  height: number;
}

export interface HTLCAttempt {
  attemptId: number;
  status: HTLCStatus;
  route?: Route;
  attemptTimeNs?: string;
  resolveTimeNs?: string;
  failure?: Failure;
  preimage?: Buffer | string | JsonBuffer;
}

export interface NodeAddress {
  network: string;
  addr: string;
}

export interface LightningNode {
  lastUpdate: number;
  pubKey: string;
  alias: string;
  addresses: NodeAddress[];
  color: string;
  features?: Array<[number, Feature]>;
}

export interface RoutingPolicy {
  timeLockDelta: number;
  minHtlc: string;
  feeBaseMsat: string;
  feeRateMilliMsat: string;
  disabled: boolean;
  maxHtlcMsat: string;
  lastUpdate: number;
}

export interface ChannelFeeReport {
  chanId: string;
  channelPoint: string;
  baseFeeMsat: string;
  feePerMil: string;
  feeRate: number;
}

export interface ForwardingEvent {
  timestamp: string;
  chanIdIn: string;
  chanIdOut: string;
  amtIn: string;
  amtOut: string;
  fee: string;
  feeMsat: string;
  amtInMsat?: string;
  amtOutMsat?: string;
  timestampNs: number;
}

export interface OutPoint {
  txidBytes: Buffer | string | JsonBuffer;
  txidStr: string;
  outputIndex: number;
}

export interface Utxo {
  addressType: AddressType;
  address: string;
  amountSat: string;
  pkScript: string;
  outpoint?: OutPoint;
  confirmations: string;
}

export interface ChannelBackups {
  chanBackups: ChannelBackup[];
}

export interface ChanBackupSnapshot {
  singleChanBackups?: ChannelBackups;
  multiChanBackup?: MultiChanBackup;
}

export interface EstimateFeeRequest {
  addrtoamount: Array<[string, number]>;
  targetConf: number;
  minConfs: number;
  spendUnconfirmed: boolean;
}

export interface ExportChannelBackupRequest {
  chanPoint?: ChannelPoint;
}

export interface WalletBalanceResponse {
  totalBalance: string;
  confirmedBalance: string;
  unconfirmedBalance: string;
}

export interface Amount {
  sat: number;
  msat: number;
}

export interface ChannelBalanceResponse {
  balance: string;
  pendingOpenBalance: string;
  localBalance?: Amount;
  remoteBalance?: Amount;
  unsettledLocalBalance?: Amount;
  unsettledRemoteBalance?: Amount;
  pendingOpenLocalBalance?: Amount;
  pendingOpenRemoteBalance?: Amount;
}

export interface GetTransactionsRequest {
  startHeight?: number;
  endHeight?: number;
}

export interface TransactionDetails {
  transactions: Transaction[];
}

export interface SendCoinsRequest {
  addr: string;
  amount: string;
  targetConf?: number;
  satPerVbyte: number;
  satPerByte?: string;
  sendAll?: boolean;
  labal?: string;
  minConfs: number;
  spendUnconfirmed: boolean;
}

export interface SendCoinsResponse {
  txid: string;
}

export interface SendManyRequest {
  addrtoamount: Array<[string, number]>;
  targetConf?: number;
  satPerVbyte: number;
  label?: string;
  minConfs: number;
  spendUnconfirmed: boolean;
}

export interface SendManyResponse {
  txid: string;
}

export interface NewAddressRequest {
  type?: AddressType;
  account: string;
}

export interface NewAddressResponse {
  address: string;
}

export interface SignMessageRequest {
  msg: Buffer | string | JsonBuffer;
  singleHash: boolean;
}

export interface SignMessageResponse {
  signature: string;
}

export interface VerifyMessageRequest {
  msg: Buffer | string | JsonBuffer;
  signature: string;
}

export interface VerifyMessageResponse {
  valid: boolean;
  pubkey: string;
}

export interface ConnectPeerRequest {
  addr?: LightningAddress;
  perm?: boolean;
  timeout?: number;
}

export interface DisconnectPeerRequest {
  pubKey: string;
}

export interface ListPeersRequest {
  latestError?: boolean;
}

export interface ListPeersResponse {
  peers: Peer[];
}

export interface ListUnspentRequest {
  minConfs: number;
  maxConfs: number;
  account: string;
}

export interface ListUnspentResponse {
  utxos: Utxo[];
}

export interface GetInfoResponse {
  version: string;
  commitHash: string;
  identityPubkey: string;
  alias: string;
  color: string;
  numPendingChannels: number;
  numActiveChannels: number;
  numInactiveChannels: number;
  numPeers: number;
  blockHeight: number;
  blockHash: string;
  bestHeaderTimestamp: string;
  syncedToChain: boolean;
  syncedToGraph: boolean;
  testnet: boolean;
  chains: Chain[];
  uris: string[];
  features: Array<[number, Feature]>;
}

export interface GetRecoveryInfoResponse {
  recoveryMode: boolean;
  recoveryFinished: boolean;
  progress: number;
}

export interface PendingChannelsResponse {
  totalLimboBalance: string;
  pendingOpenChannels: PendingOpenChannel[];
  pendingClosingChannels: ClosedChannel[];
  pendingForceClosingChannels: ForceClosedChannel[];
  waitingCloseChannels: WaitingCloseChannel[];
}

export interface ListChannelsRequest {
  activeOnly?: boolean;
  inactiveOnly?: boolean;
  publicOnly?: boolean;
  privateOnly?: boolean;
  peer?: Buffer | string | JsonBuffer;
}

export interface ListChannelsResponse {
  channels: Channel[];
}

export interface ClosedChannelsRequest {
  cooperative?: boolean;
  localForce?: boolean;
  remoteForce?: boolean;
  breach?: boolean;
  fundingCanceled?: boolean;
  abandoned?: boolean;
}

export interface ClosedChannelsResponse {
  channels: ChannelCloseSummary[];
}

export interface OpenChannelRequest {
  satPerVbyte: number;
  nodePubkey?: Buffer | string | JsonBuffer;
  nodePubkeyString?: string;
  localFundingAmount?: string;
  pushSat?: string;
  targetConf?: number;
  satPerByte?: string;
  private?: boolean;
  minHtlcMsat?: string;
  remoteCsvDelay?: number;
  minConfs?: number;
  spendUnconfirmed?: boolean;
  closeAddress?: string;
  fundingShim?: FundingShim;
  remoteMaxValueInFlightMsat?: number;
  remoteMaxHtlcs?: number;
  maxLocalCsv: number;
  commitmentType: CommitmentType;
}

export interface BatchOpenChannel {
  nodePubkey: Buffer | string | JsonBuffer;
  localFundingAmount: number;
  pushSat: number;
  pb_private: boolean;
  minHtlcMsat: number;
  remoteCsvDelay: number;
  closeAddress: string;
  pendingChanId: Buffer | string | JsonBuffer;
  commitmentType: CommitmentType;
}

export interface BatchOpenChannelRequest {
  channels: Array<BatchOpenChannel>;
  targetConf: number;
  satPerVbyte: number;
  minConfs: number;
  spendUnconfirmed: boolean;
  label: string;
}

export interface BatchOpenChannelResponse {
  pendingChannels: Array<PendingUpdate>;
}

export interface PendingUpdate {
  txid: Buffer | string | JsonBuffer;
  outputIndex: number;
}

export interface ChannelOpenUpdate {
  channelPoint: ChannelPoint;
}

export interface ReadyForPsbtFunding {
  fundingAddress: string;
  fundingAmount: number;
  psbt: Buffer | string | JsonBuffer;
}

export interface OpenStatusUpdate {
  chanPending?: PendingUpdate;
  chanOpen?: ChannelOpenUpdate;
  psbtFund?: ReadyForPsbtFunding;
  pendingChanId?: Buffer | string | JsonBuffer;
}

export interface ChanPointShim {
  amt: number;
  chanPoint?: ChannelPoint;
  localKey?: KeyDescriptor;
  remoteKey?: Buffer | string | JsonBuffer;
  pendingChanId?: Buffer | string | JsonBuffer;
  thawHeight: number;
}

export interface PsbtShim {
  pendingChanId: Buffer | string | JsonBuffer;
  basePsbt: Buffer | string | JsonBuffer;
  noPublish?: boolean;
}

export interface FundingShim {
  chainPointShim?: ChanPointShim;
  psbtShim?: PsbtShim;
}

export interface FundingShimCancel {
  pendingChanId: Buffer | string | JsonBuffer;
}

export interface FundingPsbtVerify {
  fundedPsbt: Buffer | string | JsonBuffer;
  pendingChanId: Buffer | string | JsonBuffer;
  skipFinalize: boolean;
}

export interface FundingPsbtFinalize {
  signedPsbt: Buffer | string | JsonBuffer;
  pendingChanId: Buffer | string | JsonBuffer;
  finalRawTx?: Buffer | string | JsonBuffer;
}

export interface FundingTransitionMsg {
  shimRegister?: FundingShim;
  shimCancel?: FundingShimCancel;
  psbtVerify?: FundingPsbtVerify;
  psbtFinalize?: FundingPsbtFinalize;
}

export interface ChannelPoint {
  fundingTxidBytes?: Buffer | string | JsonBuffer;
  fundingTxidStr?: string;
  outputIndex: number;
}

export interface CloseChannelRequest {
  channelPoint: ChannelPoint;
  force?: boolean;
  targetConf?: number;
  satPerByte?: string;
  deliveryAddress?: string;
}

export interface ChannelCloseUpdate {
  closingTxid: Buffer | string | JsonBuffer;
  success: boolean;
}

export interface CloseStatusUpdate {
  closePending: PendingUpdate;
  chanClose: ChannelCloseUpdate;
}

export interface AbandonChannelRequest {
  channelPoint?: ChannelPoint;
  pendingFundingShimOnly?: boolean;
  iKnowWhatIAmDoing: boolean;
}

export interface SendRequest {
  dest?: Buffer | string | JsonBuffer;
  destString?: string;
  amt?: string;
  amtMsat?: number;
  paymentHash?: Buffer | string | JsonBuffer;
  paymentHashString?: string;
  paymentRequest?: string;
  finalCltvDelta?: number;
  feeLimit?: FeeLimit;
  outgoingChanId?: string;
  lastHopPubkey?: Buffer | string | JsonBuffer;
  cltvLimit?: number;
  destCustomRecords?: Array<[number, Buffer]> | string[];
  allowSelfPayment?: boolean;
  destFeatures?: FeatureBit[];
  paymentAddr: Buffer | string | JsonBuffer;
}

export interface SendResponse {
  paymentError: string;
  paymentPreimage: Buffer | string | JsonBuffer;
  paymentRoute?: Route;
  paymentHash: Buffer | string | JsonBuffer;
}

export interface SendToRouteRequest {
  paymentHash?: Buffer | string | JsonBuffer;
  paymentHashString?: string;
  route?: Route;
}

export interface ChannelAcceptRequest {
  nodePubkey?: Buffer | string | JsonBuffer;
  chainHash?: Buffer | string | JsonBuffer;
  pendingChanId?: Buffer | string | JsonBuffer;
  fundingAmt?: string;
  pushAmt?: string;
  dustLimit?: string;
  maxValueInFlight?: string;
  channelReserve?: string;
  minHtlc?: string;
  feePerKw?: string;
  csvDelay?: number;
  maxAcceptedHtlcs?: number;
  channelFlags?: number;
  commitmentType: CommitmentType;
}

export interface ChannelAcceptResponse {
  accept: boolean;
  pendingChanId: Buffer | string | JsonBuffer;
  error: string;
  upfrontShutdown: string;
  csvDelay: number;
  reserveSat: number;
  inFlightMaxMsat: number;
  maxHtlcCount: number;
  minHtlcIn: number;
  minAcceptDepth: number;
}

export interface Chain {
  chain: string;
  network: string;
}

export interface Invoice {
  memo?: string;
  receipt?: Buffer | string | JsonBuffer;
  rPreimage?: Buffer | string | JsonBuffer;
  rHash?: Buffer | string | JsonBuffer;
  value?: string;
  valueMsat?: string;
  settled?: boolean;
  creationDate?: string;
  settleDate?: string;
  paymentRequest?: string;
  descriptionHash?: Buffer | string | JsonBuffer;
  expiry?: string;
  fallbackAddr?: string;
  cltvExpiry?: string;
  routeHints?: RouteHint[];
  private?: boolean;
  addIndex?: string;
  settleIndex?: string;
  amtPaid?: string;
  amtPaidSat?: string;
  amtPaidMsat?: string;
  state?: InvoiceState;
  htlcs?: InvoiceHTLC[];
  features?: Array<[number, Feature]>;
  isKeysend?: boolean;
  paymentAddr?: Buffer | string | JsonBuffer;
  isAmp?: boolean;
  ampInvoiceState?: Array<[string, AMPInvoiceState]>;
}

export interface InvoiceHTLC {
  chanId: string;
  htlcIndex: number;
  amtMsat: string;
  acceptHeight: number;
  acceptTime: number;
  resolveTime: number;
  expiryHeight: number;
  state: InvoiceHTLCState;
  customRecords: Array<[number, Buffer]> | string[];
  mppTotalAmtMsat: string;
  amp?: AMP;
}

export interface AMP {
  rootShare: Buffer | string | JsonBuffer;
  setId: Buffer | string | JsonBuffer;
  childIndex: number;
  hash: Buffer | string | JsonBuffer;
  preimage: Buffer | string | JsonBuffer;
}

export interface AddInvoiceResponse {
  rHash: Buffer | string | JsonBuffer;
  paymentRequest: string;
  addIndex: string;
  paymentAddr: Buffer | string | JsonBuffer;
}

export interface ListInvoiceRequest {
  pendingOnly?: boolean;
  indexOffset?: string;
  numMaxInvoices?: string;
  reversed?: boolean;
}

export interface ListInvoiceResponse {
  invoices: Invoice[];
  lastIndexOffset: string;
  firstIndexOffset: string;
}

export interface PaymentHash {
  rHashStr?: string;
  rHash?: Buffer | string | JsonBuffer;
}

export interface InvoiceSubscription {
  addIndex?: string;
  settleIndex?: string;
}

export interface PayReqString {
  payReq: string;
}

export interface PayReq {
  destination: string;
  paymentHash: string;
  numSatoshis: string;
  timestamp: string;
  expiry: string;
  description: string;
  descriptionHash: string;
  fallbackAddr: string;
  cltvExpiry: string;
  routeHints?: RouteHint[];
  paymentAddr?: Buffer | string | JsonBuffer;
  numMsat?: string;
  features?: Array<[number, Feature]>;
}

export interface Feature {
  name: string;
  isRequired: boolean;
  isKnown: boolean;
}

export interface ListPaymentsRequest {
  includeIncomplete?: boolean;
  indexOffset?: number;
  maxPayments?: number;
  reversed?: boolean;
}

export interface ListPaymentsResponse {
  payments: Payment[];
  firstIndexOffset: number;
  lastIndexOffset: number;
}

export interface DeletePaymentRequest {
  paymentHash: Buffer | string | JsonBuffer;
  failedHtlcsOnly: boolean;
}

export interface DeleteAllPaymentsRequest {
  failedPaymentsOnly: boolean;
  failedHtlcsOnly: boolean;
}

export namespace DeletePaymentResponse {}

export interface NodeUpdate {
  addresses: string[];
  identityKey: string;
  globalFeatures: string;
  alias: string;
  color: string;
  nodeAddresses: Array<NodeAddress>;
  features: Array<[number, Feature]>;
}

export interface SetID {
  setId: Buffer | string | JsonBuffer;
}

export interface AMPInvoiceState {
  state: InvoiceHTLCState;
  settleIndex: number;
  settleTime: number;
  amtPaidMsat: number;
}

export interface ChannelEdgeUpdate {
  chanId: string;
  chanPoint?: ChannelPoint;
  capacity: number;
  routingPolicy?: RoutingPolicy;
  advertisingNode: string;
  connectingNode: string;
}

export interface ClosedChannelUpdate {
  chanId: string;
  capacity: string;
  closedHeight: string;
  chanPoint: ChannelPoint;
}

export interface GraphTopologyUpdate {
  nodeUpdates: NodeUpdate[];
  channelUpdates: ChannelEdgeUpdate[];
  closedChans: ClosedChannelUpdate[];
}

export interface ChannelGraphRequest {
  includeUnannounced?: boolean;
}

export interface NodeMetricsRequest {
  types?: NodeMetricType;
}

export interface FloatMetric {
  value: number;
  normalizedValue: number;
}

export interface NodeMetricsResponse {
  betweennessCentrality: Array<[string, FloatMetric]>;
}

export interface ChannelGraph {
  nodes: LightningNode[];
  edges: ChannelEdge[];
}

export interface ChannelEventUpdate {
  openChannel?: Channel;
  closedChannel?: ChannelCloseSummary;
  activeChannel?: ChannelPoint;
  inactiveChannel?: ChannelPoint;
  pendingOpenChannel?: PendingUpdate;
  type: ChannelEventUpdate;
}

export interface EdgeLocator {
  channelId: string;
  directionReverse: boolean;
}

export interface ChannelBackup {
  chanPoint?: ChannelPoint;
  chanBackup: Buffer | string | JsonBuffer;
}

export interface MultiChanBackup {
  chanPoints: ChannelPoint[];
  multiChanBackup: Buffer | string | JsonBuffer;
}

export interface RestoreChanBackupRequest {
  chanBackups?: ChannelBackups;
  multiChanBackup: Buffer | string | JsonBuffer;
}

export interface MacaroonPermission {
  entity: string;
  action: string;
}

export interface BakeMacaroonRequest {
  permissions: MacaroonPermission[];
  rootKeyId: number;
  allowExternalPermissions: boolean;
}

export interface BakeMacaroonResponse {
  macaroon: string;
}

export interface ListMacaroonIDsRequest {}

export interface ListMacaroonIDsResponse {
  rootKeyIds: Array<number>;
}

export interface MacaroonPermissionList {
  permissions: MacaroonPermission[];
}

export interface DeleteMacaroonIDRequest {
  rootKeyId: number;
}

export interface DeleteMacaroonIDResponse {
  deleted: boolean;
}

export interface ListPermissionsResponse {
  methodPermissions: Array<[string, MacaroonPermissionList]>;
}

export interface Op {
  entity: string;
  actions: string[];
}

export interface CheckMacPermRequest {
  macaroon: Buffer | string | JsonBuffer;
  permissions: Array<MacaroonPermission>;
  fullmethod: string;
}

export interface CheckMacPermResponse {
  valid: boolean;
}

export interface RPCMiddlewareRequest {
  requestId: number;
  rawMacaroon: Buffer | string | JsonBuffer;
  customCaveatCondition: string;
  streamAuth?: StreamAuth;
  request?: RPCMessage;
  response?: RPCMessage;
  msgId: number;
}

export interface RPCMiddlewareResponse {
  refMsgId: number;
  register?: MiddlewareRegistration;
  feedback?: InterceptFeedback;
}

export interface MiddlewareRegistration {
  middlewareName: string;
  customMacaroonCaveatName: string;
  readOnlyMode: boolean;
}

export interface InterceptFeedback {
  error: string;
  replaceResponse: boolean;
  replacementSerialized: Buffer | string | JsonBuffer;
}

export enum MiddlewareMessageCase {
  MIDDLEWARE_MESSAGE_NOT_SET = 0,
  REGISTER = 2,
  FEEDBACK = 3,
}

export interface StreamAuth {
  methodFullUri: string;
}

export interface RPCMessage {
  methodFullUri: string;
  streamRpc: boolean;
  typeName: string;
  serialized: Buffer | string | JsonBuffer;
}

export interface MacaroonId {
  nonce: Buffer | string | JsonBuffer;
  storageid: Buffer | string | JsonBuffer;
  ops: Op[];
}

export interface ChanInfoRequest {
  chanId: string;
}

export interface ChannelEdge {
  channelId: string;
  chanPoint: string;
  lastUpdate: number;
  node1Pub: string;
  node2Pub: string;
  capacity: string;
  node1Policy?: RoutingPolicy;
  node2Policy?: RoutingPolicy;
}

export interface NodeInfoRequest {
  pubKey: string;
  includeChannels?: boolean;
}

export interface NodeInfo {
  node?: LightningNode;
  numChannels: number;
  totalCapacity: string;
  channels: ChannelEdge[];
}

export interface QueryRoutesRequest {
  pubKey: string;
  amt?: string;
  amtMsat?: number;
  finalCltvDelta?: number;
  feeLimit?: FeeLimit;
  ignoredNodes?: Buffer[] | string[];
  ignoredEdges?: EdgeLocator[];
  sourcePubKey?: string;
  useMissionControl?: boolean;
  ignoredPairs?: NodePair[];
  cltvLimit?: number;
  destCustomRecords?: Array<[number, Buffer]> | string[];
  outgoingChanId?: string;
  lastHopPubkey?: Buffer | string | JsonBuffer;
  routeHints?: RouteHint[];
  destFeatures?: FeatureBit[];
}

export interface QueryRoutesResponse {
  routes: Route[];
  successProb: number;
}

export interface NodePair {
  from?: Buffer | string | JsonBuffer;
  to?: Buffer | string | JsonBuffer;
}

export interface NetworkInfo {
  graphDiameter: number;
  avgOutDegree: number;
  maxOutDegree: number;
  numNodes: number;
  numChannels: number;
  totalNetworkCapacity: string;
  avgChannelSize: number;
  minChannelSize: string;
  maxChannelSize: string;
  medianChannelSize: string;
  medianChannelSizeSat: string;
  numZombieChans: string;
}

export interface DebugLevelRequest {
  show?: boolean;
  levelSpec: string;
}

export interface DebugLevelResponse {
  subSystems: string;
}

export interface FeeReportResponse {
  channelFees: ChannelFeeReport[];
  dayFeeSum: string;
  weekFeeSum: string;
  monthFeeSum: string;
}

export interface PolicyUpdateRequest {
  global?: boolean;
  chanPoint?: ChannelPoint;
  baseFeeMsat: string;
  feeRate: number;
  timeLockDelta: number;
  maxHtlcMsat?: string;
  minHtlcMsat?: string;
  minHtlcMsatSpecified?: boolean;
}

export interface FailedUpdate {
  outpoint?: OutPoint;
  reason: UpdateFailure;
  updateError: string;
}

export interface PolicyUpdateResponse {
  failedUpdates: Array<FailedUpdate>;
}

export interface ForwardingHistoryRequest {
  startTime?: string;
  endTime?: string;
  indexOffset?: number;
  numMaxEvents?: number;
}

export interface ForwardingHistoryResponse {
  forwardingEvents: ForwardingEvent[];
  lastOffsetIndex: number;
}

/**
 * LND gRPC API Client
 */
export interface LnRpc {
  /**
   * walletBalance returns total unspent outputs(confirmed and unconfirmed), all confirmed unspent outputs and all
   * unconfirmed unspent outputs under control of the wallet.
   */
  walletBalance(args?: {}): Promise<WalletBalanceResponse>;

  /**
   * channelBalance returns the total funds available across all open channels in satoshis.
   */
  channelBalance(args?: {}): Promise<ChannelBalanceResponse>;

  /**
   * getTransactions returns a list describing all the known transactions relevant to the wallet.
   */
  getTransactions(args?: GetTransactionsRequest): Promise<TransactionDetails>;

  /**
   * EstimateFee asks the chain backend to estimate the fee rate and total fees for a transaction
   * that pays to multiple specified outputs.
   */
  estimateFee(args?: EstimateFeeRequest): Promise<EstimateFeeResponse>;

  /**
   * ListUnspent returns a list of all utxos spendable by the wallet with a number of confirmations
   * between the specified minimum and maximum.
   */
  listUnspent(args?: ListUnspentRequest): Promise<ListUnspentResponse>;

  /**
   * sendCoins executes a request to send coins to a particular address. Unlike sendMany, this RPC call only allows
   * creating a single output at a time. If neither targetConf, or satPerByte are set, then the internal wallet
   * will consult its fee model to determine a fee for the default confirmation target.
   */
  sendCoins(args: SendCoinsRequest): Promise<SendCoinsResponse>;

  /**
   * subscribeTransactions creates a uni-directional stream from the server to the client in which any newly
   * discovered transactions relevant to the wallet are sent over.
   */
  subscribeTransactions(args?: {}): Readable<Transaction>;

  /**
   * sendMany handles a request for a transaction that creates multiple specified outputs in parallel. If neither
   * targetConf, or satPerByte are set, then the internal wallet will consult its fee model to determine a fee
   * for the default confirmation target.
   */
  sendMany(args: SendManyRequest): Promise<SendManyResponse>;

  /**
   * newAddress creates a new address under control of the local wallet.
   */
  newAddress(args?: NewAddressRequest): Promise<NewAddressResponse>;

  /**
   * signMessage signs a message with this node’s private key. The returned signature string is zbase32 encoded and
   * pubkey recoverable, meaning that only the message digest and signature are needed for verification.
   */
  signMessage(args: SignMessageRequest): Promise<SignMessageResponse>;

  /**
   * verifyMessage verifies a signature over a msg. The signature must be zbase32 encoded and signed by an active
   * node in the resident node’s channel database. In addition to returning the validity of the signature,
   * verifyMessage also returns the recovered pubkey from the signature.
   */
  verifyMessage(args: VerifyMessageRequest): Promise<VerifyMessageResponse>;

  /**
   * connectPeer attempts to establish a connection to a remote peer. This is at the networking level, and is used
   * for communication between nodes. This is distinct from establishing a channel with a peer.
   */
  connectPeer(args: ConnectPeerRequest): Promise<{}>;

  /**
   * disconnectPeer attempts to disconnect one peer from another identified by a given pubKey. In the case that we
   * currently have a pending or active channel with the target peer, then this action will be not be allowed.
   */
  disconnectPeer(args: DisconnectPeerRequest): Promise<{}>;

  /**
   * listPeers returns a verbose listing of all currently active peers.
   */
  listPeers(args?: ListPeersRequest): Promise<ListPeersResponse>;

  /**
   * subscribePeerEvents creates a uni-directional stream from the server to
   * the client in which any events relevant to the state of peers are sent
   * over. Events include peers going online and offline.
   */
  subscribePeerEvents(args?: {}): Readable<PeerEvent>;

  /**
   * getInfo returns general information concerning the lightning node including it’s identity pubkey, alias, the
   * chains it is connected to, and information concerning the number of open+pending channels.
   */
  getInfo(args?: {}): Promise<GetInfoResponse>;

  /**
   * getRecoveryInfo returns information concerning the recovery mode including
   * whether it's in a recovery mode, whether the recovery is finished, and the
   * progress made so far.
   */
  getRecoveryInfo(args?: {}): Promise<GetRecoveryInfoResponse>;

  /**
   * pendingChannels returns a list of all the channels that are currently considered “pending”. A channel is
   * pending if it has finished the funding workflow and is waiting for confirmations for the funding txn, or is in
   * the process of closure, either initiated cooperatively or non-cooperatively.
   */
  pendingChannels(args?: {}): Promise<PendingChannelsResponse>;

  /**
   * listChannels returns a description of all the open channels that this node is a participant in.
   */
  listChannels(args?: ListChannelsRequest): Promise<ListChannelsResponse>;

  /**
   * closedChannels returns a description of all the closed channels that this node was a participant in.
   */
  closedChannels(args?: ClosedChannelsRequest): Promise<ClosedChannelsResponse>;

  /**
   * openChannelSync is a synchronous version of the openChannel RPC call. This call is meant to be consumed by
   * clients to the REST proxy. As with all other sync calls, all byte slices are intended to be populated as hex
   * encoded strings.
   */
  openChannelSync(args: OpenChannelRequest): Promise<ChannelPoint>;

  /**
   * openChannel attempts to open a singly funded channel specified in the request to a remote peer. Users are able
   * to specify a target number of blocks that the funding transaction should be confirmed in, or a manual fee rate
   * to us for the funding transaction. If neither are specified, then a lax block confirmation target is used.
   */
  openChannel(args: OpenChannelRequest): Readable<OpenStatusUpdate>;

  /* lncli: `batchopenchannel`
    BatchOpenChannel attempts to open multiple single-funded channels in a
    single transaction in an atomic way. This means either all channel open
    requests succeed at once or all attempts are aborted if any of them fail.
    This is the safer variant of using PSBTs to manually fund a batch of
    channels through the OpenChannel RPC.
    */
  batchOpenChannel(
    args: BatchOpenChannelRequest
  ): Promise<BatchOpenChannelResponse>;

  /**
   * fundingStateStep is an advanced funding related call that allows the caller
   * to either execute some preparatory steps for a funding workflow, or
   * manually progress a funding workflow. The primary way a funding flow is
   * identified is via its pending channel ID. As an example, this method can be
   * used to specify that we're expecting a funding flow for a particular
   * pending channel ID, for which we need to use specific parameters.
   * Alternatively, this can be used to interactively drive PSBT signing for
   * funding for partially complete funding transactions.
   */
  fundingStateStep(args?: FundingTransitionMsg): Promise<{}>;

  /**
   * channelAcceptor dispatches a bi-directional streaming RPC in which
   * OpenChannel requests are sent to the client and the client responds with
   * a boolean that tells LND whether or not to accept the channel. This allows
   * node operators to specify their own criteria for accepting inbound channels
   * through a single persistent connection.
   */
  channelAcceptor(args: ChannelAcceptRequest): Duplex<ChannelAcceptResponse>;

  /**
   * closeChannel attempts to close an active channel identified by its channel outpoint (ChannelPoint). The
   * actions of this method can additionally be augmented to attempt a force close after a timeout period in the
   * case of an inactive peer. If a non-force close (cooperative closure) is requested, then the user can specify
   * either a target number of blocks until the closure transaction is confirmed, or a manual fee rate. If neither
   * are specified, then a default lax, block confirmation target is used.
   */
  closeChannel(args: CloseChannelRequest): Readable<CloseStatusUpdate>;

  /**
   * abandonChannel removes all channel state from the database except for a close summary. This method can be used
   * to get rid of permanently unusable channels due to bugs fixed in newer versions of lnd. Only available when in
   * debug builds of lnd.
   */
  abandonChannel(args: AbandonChannelRequest): Promise<{}>;

  /**
   * Deprecated, use routerrpc.sendPaymentV2. sendPayment dispatches a bi-directional streaming RPC for sending payments
   * through the Lightning Network. A single RPC invocation creates a persistent bi-directional stream allowing clients
   * to rapidly send payments through the Lightning Network with a single persistent connection.
   */
  sendPayment(args: SendRequest): Duplex<SendRequest, SendResponse>;

  /**
   * sendPaymentSync is the synchronous non-streaming version of sendPayment. This RPC is intended to be consumed
   * by clients of the REST proxy. Additionally, this RPC expects the destination’s key and the payment hash
   * (if any) to be encoded as hex strings.
   */
  sendPaymentSync(args: SendRequest): Promise<SendResponse>;

  /**
   * Deprecated, use routerrpc.sendToRouteV2. sendToRoute is a bi-directional streaming RPC for sending payment
   * through the Lightning Network. This method differs from SendPayment in that it allows users to specify a full
   * route manually. This can be used for things like rebalancing, and atomic swaps.
   */
  sendToRoute(
    args: SendToRouteRequest
  ): Duplex<SendToRouteRequest, SendResponse>;

  /**
   * sendToRouteSync is a synchronous version of sendToRoute. It Will block until the payment either fails or succeeds.
   */
  sendToRouteSync(args: SendToRouteRequest): Promise<SendResponse>;

  /**
   * addInvoice attempts to add a new invoice to the invoice database. Any duplicated invoices are rejected, therefore
   * all invoices must have a unique payment preimage.
   */
  addInvoice(args: Invoice): Promise<AddInvoiceResponse>;

  /**
   * listInvoices returns a list of all the invoices currently stored within the database. Any active debug
   * invoices are ignored. It has full support for paginated responses, allowing users to query for specific
   * invoices through their addIndex. This can be done by using either the firstIndexOffset or lastIndexOffset
   * fields included in the response as the indexOffset of the next request. The reversed flag is set by default
   * in order to paginate backwards. If you wish to paginate forwards, you must explicitly set the flag to false.
   * If none of the parameters are specified, then the last 100 invoices will be returned.
   */
  listInvoices(args?: ListInvoiceRequest): Promise<ListInvoiceResponse>;

  /**
   * lookupInvoice attempts to look up an invoice according to its payment hash. The passed payment hash must
   * be exactly 32 bytes, if not, an error is returned.
   */
  lookupInvoice(args: PaymentHash): Promise<Invoice>;

  /**
   * subscribeInvoices returns a uni-directional stream (server -> client) for notifying the client of newly
   * added/settled invoices. The caller can optionally specify the addIndex and/or the settleIndex. If the
   * addIndex is specified, then we’ll first start by sending add invoice events for all invoices with an
   * addIndex greater than the specified value. If the settleIndex is specified, the next, we’ll send out all
   * settle events for invoices with a settleIndex greater than the specified value. One or both of these fields
   * can be set. If no fields are set, then we’ll only send out the latest add/settle events.
   */
  subscribeInvoices(args?: InvoiceSubscription): Readable<Invoice>;

  /**
   * decodePayReq takes an encoded payment request string and attempts to decode it, returning a full description
   * of the conditions encoded within the payment request.
   */
  decodePayReq(args: PayReqString): Promise<PayReq>;

  /**
   * listPayments returns a list of all outgoing payments.
   */
  listPayments(args?: ListPaymentsRequest): Promise<ListPaymentsResponse>;

  /**
   * deleteAllPayments deletes all outgoing payments from DB.
   */
  deleteAllPayments(args?: {}): Promise<{}>;

  /**
   * describeGraph returns a description of the latest graph state from the point of view of the node. The graph
   * information is partitioned into two components: all the nodes/vertexes, and all the edges that connect the
   * vertexes themselves. As this is a directed graph, the edges also contain the node directional specific routing
   * policy which includes: the time lock delta, fee information, etc.
   */
  describeGraph(args?: ChannelGraphRequest): Promise<ChannelGraph>;

  /**
   * getNodeMetrics returns node metrics calculated from the graph. Currently
   * the only supported metric is betweenness centrality of individual nodes.
   */
  getNodeMetrics(args?: ChannelGraphRequest): Promise<NodeMetricsResponse>;

  /**
   * getChanInfo returns the latest authenticated network announcement for the given channel identified by its
   * channel ID: an 8-byte integer which uniquely identifies the location of transaction’s funding output within
   * the blockchain.
   */
  getChanInfo(args: ChanInfoRequest): Promise<ChannelEdge>;

  /**
   * getNodeInfo returns the latest advertised, aggregated, and authenticated channel information for the specified
   * node identified by its key.
   */
  getNodeInfo(args: NodeInfoRequest): Promise<NodeInfo>;

  /**
   * queryRoutes attempts to query the daemon’s Channel Router for a possible route to a target destination capable
   * of carrying a specific amount of satoshis. The retuned route contains the full details required to craft and
   * send an HTLC, also including the necessary information that should be present within the Sphinx packet
   * encapsulated within the HTLC.
   */
  queryRoutes(args: QueryRoutesRequest): Promise<QueryRoutesResponse>;

  /**
   * getNetworkInfo returns some basic stats about the known channel graph from the point of view of the node.
   */
  getNetworkInfo(args?: {}): Promise<NetworkInfo>;

  /**
   * stopDaemon will send a shutdown request to the interrupt handler, triggering a graceful shutdown of the daemon.
   */
  stopDaemon(args?: {}): Promise<{}>;

  /**
   * subscribeChannelGraph launches a streaming RPC that allows the caller to receive notifications upon any
   * changes to the channel graph topology from the point of view of the responding node. Events notified include:
   * new nodes coming online, nodes updating their authenticated attributes, new channels being advertised, updates
   * in the routing policy for a directional channel edge, and when channels are closed on-chain.
   */
  subscribeChannelGraph(args?: {}): Readable<GraphTopologyUpdate>;

  /**
   * SubscribeChannelEvents creates a uni-directional stream from the server to
   * the client in which any updates relevant to the state of the channels are
   * sent over. Events include new active channels, inactive channels, and closed
   * channels.
   */
  subscribeChannelEvents(args?: {}): Readable<ChannelEventUpdate>;

  /**
   * ExportChannelBackup attempts to return an encrypted static channel backup
   * for the target channel identified by it channel point. The backup is
   * encrypted with a key generated from the aezeed seed of the user. The
   * returned backup can either be restored using the RestoreChannelBackup
   * method once lnd is running, or via the InitWallet and UnlockWallet methods
   * from the WalletUnlocker service.
   */
  exportChannelBackup(
    args?: ExportChannelBackupRequest
  ): Promise<ChannelBackup>;

  /**
   * ExportAllChannelBackups returns static channel backups for all existing
   * channels known to lnd. A set of regular singular static channel backups for
   * each channel are returned. Additionally, a multi-channel backup is returned
   * as well, which contains a single encrypted blob containing the backups of
   * each channel.
   */
  exportAllChannelBackups(args?: {}): Promise<ChanBackupSnapshot>;

  /**
   * VerifyChanBackup allows a caller to verify the integrity of a channel backup
   * snapshot. This method will accept either a packed Single or a packed Multi.
   * Specifying both will result in an error.
   */
  verifyChanBackup(args: ChanBackupSnapshot): Promise<{}>;

  /**
   * RestoreChannelBackups accepts a set of singular channel backups, or a
   * single encrypted multi-chan backup and attempts to recover any funds
   * remaining within the channel. If we are able to unpack the backup, then the
   * new channel will be shown under listchannels, as well as pending channels.
   */
  restoreChannelBackups(args: RestoreChanBackupRequest): Promise<{}>;

  /**
   * SubscribeChannelBackups allows a client to sub-subscribe to the most up to
   * date information concerning the state of all channel backups. Each time a
   * new channel is added, we return the new set of channels, along with a
   * multi-chan backup containing the backup info for all channels. Each time a
   * channel is closed, we send a new update, which contains new new chan back
   * ups, but the updated set of encrypted multi-chan backups with the closed
   * channel(s) removed.
   */
  subscribeChannelBackups(args?: {}): Readable<ChanBackupSnapshot>;

  /**
   * bakeMacaroon allows the creation of a new macaroon with custom read and
   * write permissions. No first-party caveats are added since this can be done
   * offline.
   */
  bakeMacaroon(args: BakeMacaroonRequest): Promise<BakeMacaroonResponse>;

  /**
   *  ListMacaroonIDs returns all root key IDs that are in use.
   */
  listMacaroonIds(
    args: ListMacaroonIDsRequest
  ): Promise<ListMacaroonIDsResponse>;

  /**
   *  deleteMacaroonId deletes the specified macaroon ID and invalidates all macaroons derived from that ID.
   */
  deleteMacaroonId(
    args: DeleteMacaroonIDRequest
  ): Promise<DeleteMacaroonIDResponse>;

  /**
   * listPermissions lists all RPC method URIs and their required macaroon
   * permissions to access them.
   */
  listPermissions(args?: {}): Promise<ListPermissionsResponse>;

  /**
   * debugLevel allows a caller to programmatically set the logging verbosity of lnd. The logging can be targeted
   * according to a coarse daemon-wide logging level, or in a granular fashion to specify the logging for a target
   * sub-system.
   */
  debugLevel(args: DebugLevelRequest): Promise<DebugLevelResponse>;

  /**
   * feeReport allows the caller to obtain a report detailing the current fee schedule enforced by the node globally
   * for each channel.
   */
  feeReport(args?: {}): Promise<FeeReportResponse>;

  /**
   * updateChannelPolicy allows the caller to update the fee schedule and channel policies for all channels globally,
   * or a particular channel.
   */
  updateChannelPolicy(args: PolicyUpdateRequest): Promise<{}>;

  /**
   * forwardingHistory allows the caller to query the htlcswitch for a record of all HTLC’s forwarded within the
   * target time range, and integer offset within that time range. If no time-range is specified, then the first
   * chunk of the past 24 hrs of forwarding history are returned. A list of forwarding events are returned. The
   * size of each forwarding event is 40 bytes, and the max message size able to be returned in gRPC is 4 MiB. As a
   * result each message can only contain 50k entries. Each response has the index offset of the last entry. The
   * index offset can be provided to the request to allow the caller to skip a series of records.
   */
  forwardingHistory(
    args?: ForwardingHistoryRequest
  ): Promise<ForwardingHistoryResponse>;
}
