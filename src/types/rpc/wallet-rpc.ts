import {
  OutPoint,
  TransactionDetails,
  Utxo,
  ListUnspentResponse,
  Transaction,
  ListUnspentRequest,
  AddressType,
  EstimateFeeRequest,
} from "./ln-rpc";
import { KeyDescriptor, KeyLocator, TxOut } from "./sign-rpc";
import { JsonBuffer } from "../general";

export enum WitnessType {
  UNKNOWN_WITNESS = 0,
  COMMITMENT_TIME_LOCK = 1,
  COMMITMENT_NO_DELAY = 2,
  COMMITMENT_REVOKE = 3,
  HTLC_OFFERED_REVOKE = 4,
  HTLC_ACCEPTED_REVOKE = 5,
  HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 6,
  HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 7,
  HTLC_OFFERED_REMOTE_TIMEOUT = 8,
  HTLC_ACCEPTED_REMOTE_SUCCESS = 9,
  HTLC_SECOND_LEVEL_REVOKE = 10,
  WITNESS_KEY_HASH = 11,
  NESTED_WITNESS_KEY_HASH = 12,
  COMMITMENT_ANCHOR = 13,
}

export enum SweepsCase {
  SWEEPS_NOT_SET = 0,
  TRANSACTION_DETAILS = 1,
  TRANSACTION_IDS = 2,
}

export interface ListUnspentReq {
  minConfs?: number;
  maxConfs?: number;
}

export interface ListUnspentResp {
  utxos: Utxo[];
}

export interface LeaseOutputRequest {
  id: Buffer | string | JsonBuffer;
  outpoint?: OutPoint;
}

export interface LeaseOutputResponse {
  expiration: number;
}

export interface ReleaseOutputRequest {
  id: Buffer | string | JsonBuffer;
  outpoint?: OutPoint;
  expirationSeconds: number;
}

export interface KeyReq {
  keyFingerPrint: number;
  keyFamily: number;
}

export interface AddrResponse {
  addr: string;
}

export interface Tx {
  txHex: Buffer | string | JsonBuffer;
  label?: string;
}

export interface PublishResponse {
  publishError?: string;
}

export interface SendOutputsRequest {
  satPerKw: number;
  outputs: TxOut[];
  label?: string;
  minConfs: number;
  spendUnconfirmed: boolean;
}

export interface SendOutputsResponse {
  rawTx: Buffer | string | JsonBuffer;
}

export interface EstimateFeeReq {
  confTarget: number;
}

export interface EstimateFeeResp {
  satPerKw: number;
}

export interface PendingSweep {
  outpoint?: OutPoint;
  witnessType: WitnessType;
  amountSat: number;
  satPerByte: number;
  broadcastAttempts: number;
  nextBroadcastHeight: number;
  requestedConfTarget: number;
  requestedSatPerByte: number;
  satPerVbyte: number;
  requestedSatPerVbyte: number;
  force: boolean;
}

export interface PendingSweepsResponse {
  pendingSweeps: PendingSweep[];
}

export interface BumpFeeRequest {
  outpoint: OutPoint;
  targetConf?: number;
  satPerByte?: number;
  force?: boolean;
  satPerVbyte: number;
}

export interface ListSweepsRequest {
  verbose?: boolean;
}

export interface TransactionIDs {
  transactionIds: string[];
}

export interface ListSweepsResponse {
  transactionDetails?: TransactionDetails;
  transactionIds?: TransactionIDs;
}

export interface FundPsbtRequest {
  psbt: Buffer | string | JsonBuffer;
  raw?: TxTemplate;
  targetConf: number;
  satPerVbyte: number;
  account: string;
  minConfs: number;
  spendUnconfirmed: boolean;
}

export enum FundPsbtRequestTemplateCase {
  TEMPLATE_NOT_SET = 0,
  PSBT = 1,
  RAW = 2,
}

export enum FundPsbtRequestFeesCase {
  FEES_NOT_SET = 0,
  TARGET_CONF = 3,
  SAT_PER_VBYTE = 4,
}

export interface FundPsbtResponse {
  fundedPsbt: Buffer | string | JsonBuffer;
  changeOutputIndex: number;
  lockedUtxos: Array<UtxoLease>;
}

export interface TxTemplate {
  inputs: Array<OutPoint>;
  outputs: Array<[string, number]>;
}

export interface UtxoLease {
  id: Buffer | string | JsonBuffer;
  outpoint?: OutPoint;
  expiration: number;
}

export interface FinalizePsbtRequest {
  fundedPsbt: Buffer | string | JsonBuffer;
  account: string;
}

export interface LabelTransactionRequest {
  txid: Buffer | string | JsonBuffer;
  label: string;
  overwrite?: boolean;
}

export interface FinalizePsbtResponse {
  signedPsbt: Buffer | string | JsonBuffer;
  rawFinalTx: Buffer | string | JsonBuffer;
}

export interface UtxoLease {
  id: Buffer | string | JsonBuffer;
  outpoint?: OutPoint;
  expiration: number;
}

export interface FundPsbtResponse {
  fundedPsbt: Buffer | string | JsonBuffer;
  changeOutputIndex: number;
  lockedUtxos: Array<UtxoLease>;
}

export interface FinalizePsbtRequest {
  fundedPsbt: Buffer | string | JsonBuffer;
  account: string;
}

export interface ListLeasesRequest {}

export interface ReleaseOutputResponse {}
export interface ListLeasesRequest {}

export interface ListLeasesResponse {
  lockedUtxos: Array<UtxoLease>;
}

export interface ListLeasesResponse {
  lockedUtxos: Array<UtxoLease>;
}

export interface ListAccountsRequest {
  name?: string;
  addressType?: AddressType;
}

export interface AddrRequest {
  account: string;
  type: AddressType;
  change: boolean;
}

export interface Account {
  name: string;
  addressType: AddressType;
  extendedPublicKey: string;
  masterKeyFingerprint: Buffer | string | JsonBuffer;
  derivationPath: string;
  externalKeyCount: number;
  internalKeyCount: number;
  watchOnly: boolean;
}

export interface ListAccountsResponse {
  accounts: Array<Account>;
}

export interface ImportAccountRequest {
  name: string;
  extendedPublicKey: string;
  masterKeyFingerprint: Buffer | string | JsonBuffer;
  addressType: AddressType;
  dryRun: boolean;
}

export interface ImportAccountResponse {
  account?: Account;
  dryRunExternalAddrs: Array<string>;
  dryRunInternalAddrs: Array<string>;
}

export interface ImportPublicKeyRequest {
  publicKey: Buffer | string | JsonBuffer;
  addressType: AddressType;
}

export interface ImportPublicKeyResponse {}

export interface BumpFeeResponse {}

export interface PendingSweepsRequest {}

export interface LabelTransactionResponse {}

export interface EstimateFeeResponse {
  satPerKw: number;
}

/**
 * LND Wallet gRPC API Client
 */
export interface WalletRpc {
  /*
    ListUnspent returns a list of all utxos spendable by the wallet with a
    number of confirmations between the specified minimum and maximum.
    */
  listUnspent(args: ListUnspentRequest): Promise<ListUnspentResponse>;

  /*
    LeaseOutput locks an output to the given ID, preventing it from being
    available for any future coin selection attempts. The absolute time of the
    lock's expiration is returned. The expiration of the lock can be extended by
    successive invocations of this RPC. Outputs can be unlocked before their
    expiration through `ReleaseOutput`.
    */
  leaseOutput(args: LeaseOutputRequest): Promise<LeaseOutputResponse>;

  /*
    ReleaseOutput unlocks an output, allowing it to be available for coin
    selection if it remains unspent. The ID should match the one used to
    originally lock the output.
    */
  releaseOutput(args: ReleaseOutputRequest): Promise<ReleaseOutputResponse>;

  /*
    ListLeases lists all currently locked utxos.
    */
  listLeases(args: ListLeasesRequest): Promise<ListLeasesResponse>;

  /*
    DeriveNextKey attempts to derive the *next* key within the key family
    (account in BIP43) specified. This method should return the next external
    child within this branch.
    */
  deriveNextKey(args: KeyReq): Promise<KeyDescriptor>;

  /*
    DeriveKey attempts to derive an arbitrary key specified by the passed
    KeyLocator.
    */
  deriveKey(args: KeyLocator): Promise<KeyDescriptor>;

  /*
    NextAddr returns the next unused address within the wallet.
    */
  nextAddr(args: AddrRequest): Promise<AddrResponse>;

  /*
    ListAccounts retrieves all accounts belonging to the wallet by default. A
    name and key scope filter can be provided to filter through all of the
    wallet accounts and return only those matching.
    */
  listAccounts(args?: ListAccountsRequest): Promise<ListAccountsResponse>;

  /*
    ImportAccount imports an account backed by an account extended public key.
    The master key fingerprint denotes the fingerprint of the root key
    corresponding to the account public key (also known as the key with
    derivation path m/). This may be required by some hardware wallets for
    proper identification and signing.

    The address type can usually be inferred from the key's version, but may be
    required for certain keys to map them into the proper scope.

    For BIP-0044 keys, an address type must be specified as we intend to not
    support importing BIP-0044 keys into the wallet using the legacy
    pay-to-pubkey-hash (P2PKH) scheme. A nested witness address type will force
    the standard BIP-0049 derivation scheme, while a witness address type will
    force the standard BIP-0084 derivation scheme.

    For BIP-0049 keys, an address type must also be specified to make a
    distinction between the standard BIP-0049 address schema (nested witness
    pubkeys everywhere) and our own BIP-0049Plus address schema (nested pubkeys
    externally, witness pubkeys internally).

    NOTE: Events (deposits/spends) for keys derived from an account will only be
    detected by lnd if they happen after the import. Rescans to detect past
    events will be supported later on.
    */
  importAccount(args: ImportAccountRequest): Promise<ImportAccountResponse>;

  /*
    ImportPublicKey imports a public key as watch-only into the wallet.

    NOTE: Events (deposits/spends) for a key will only be detected by lnd if
    they happen after the import. Rescans to detect past events will be
    supported later on.
    */
  importPublicKey(
    args: ImportPublicKeyRequest
  ): Promise<ImportPublicKeyResponse>;

  /*
    PublishTransaction attempts to publish the passed transaction to the
    network. Once this returns without an error, the wallet will continually
    attempt to re-broadcast the transaction on start up, until it enters the
    chain.
    */
  publishTransaction(args: Transaction): Promise<PublishResponse>;

  /*
    SendOutputs is similar to the existing sendmany call in Bitcoind, and
    allows the caller to create a transaction that sends to several outputs at
    once. This is ideal when wanting to batch create a set of transactions.
    */
  sendOutputs(args: SendOutputsRequest): Promise<SendOutputsResponse>;

  /*
    EstimateFee attempts to query the internal fee estimator of the wallet to
    determine the fee (in sat/kw) to attach to a transaction in order to
    achieve the confirmation target.
    */
  estimateFee(args: EstimateFeeRequest): Promise<EstimateFeeResponse>;

  /*
    PendingSweeps returns lists of on-chain outputs that lnd is currently
    attempting to sweep within its central batching engine. Outputs with similar
    fee rates are batched together in order to sweep them within a single
    transaction.

    NOTE: Some of the fields within PendingSweepsRequest are not guaranteed to
    remain supported. This is an advanced API that depends on the internals of
    the UtxoSweeper, so things may change.
    */
  pendingSweeps(args: PendingSweepsRequest): Promise<PendingSweepsResponse>;

  /*
    BumpFee bumps the fee of an arbitrary input within a transaction. This RPC
    takes a different approach than bitcoind's bumpfee command. lnd has a
    central batching engine in which inputs with similar fee rates are batched
    together to save on transaction fees. Due to this, we cannot rely on
    bumping the fee on a specific transaction, since transactions can change at
    any point with the addition of new inputs. The list of inputs that
    currently exist within lnd's central batching engine can be retrieved
    through the PendingSweeps RPC.

    When bumping the fee of an input that currently exists within lnd's central
    batching engine, a higher fee transaction will be created that replaces the
    lower fee transaction through the Replace-By-Fee (RBF) policy. If it

    This RPC also serves useful when wanting to perform a Child-Pays-For-Parent
    (CPFP), where the child transaction pays for its parent's fee. This can be
    done by specifying an outpoint within the low fee transaction that is under
    the control of the wallet.

    The fee preference can be expressed either as a specific fee rate or a delta
    of blocks in which the output should be swept on-chain within. If a fee
    preference is not explicitly specified, then an error is returned.

    Note that this RPC currently doesn't perform any validation checks on the
    fee preference being provided. For now, the responsibility of ensuring that
    the new fee preference is sufficient is delegated to the user.
    */
  bumpFee(args: BumpFeeRequest): Promise<BumpFeeResponse>;

  /*
    ListSweeps returns a list of the sweep transactions our node has produced.
    Note that these sweeps may not be confirmed yet, as we record sweeps on
    broadcast, not confirmation.
    */
  listSweeps(args: ListSweepsRequest): Promise<ListSweepsResponse>;

  /*
    LabelTransaction adds a label to a transaction. If the transaction already
    has a label the call will fail unless the overwrite bool is set. This will
    overwrite the exiting transaction label. Labels must not be empty, and
    cannot exceed 500 characters.
    */
  labelTransaction(
    args: LabelTransactionRequest
  ): Promise<LabelTransactionResponse>;

  /*
    FundPsbt creates a fully populated PSBT that contains enough inputs to fund
    the outputs specified in the template. There are two ways of specifying a
    template: Either by passing in a PSBT with at least one output declared or
    by passing in a raw TxTemplate message.

    If there are no inputs specified in the template, coin selection is
    performed automatically. If the template does contain any inputs, it is
    assumed that full coin selection happened externally and no additional
    inputs are added. If the specified inputs aren't enough to fund the outputs
    with the given fee rate, an error is returned.

    After either selecting or verifying the inputs, all input UTXOs are locked
    with an internal app ID.

    NOTE: If this method returns without an error, it is the caller's
    responsibility to either spend the locked UTXOs (by finalizing and then
    publishing the transaction) or to unlock/release the locked UTXOs in case of
    an error on the caller's side.
    */
  fundPsbt(args: FundPsbtRequest): Promise<FundPsbtResponse>;

  /*
    FinalizePsbt expects a partial transaction with all inputs and outputs fully
    declared and tries to sign all inputs that belong to the wallet. Lnd must be
    the last signer of the transaction. That means, if there are any unsigned
    non-witness inputs or inputs without UTXO information attached or inputs
    without witness data that do not belong to lnd's wallet, this method will
    fail. If no error is returned, the PSBT is ready to be extracted and the
    final TX within to be broadcast.

    NOTE: This method does NOT publish the transaction once finalized. It is the
    caller's responsibility to either publish the transaction on success or
    unlock/release any locked UTXOs in case of an error in this method.
    */
  finalizePsbt(args: FinalizePsbtRequest): Promise<FinalizePsbtResponse>;
}
