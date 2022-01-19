import { ChanBackupSnapshot } from "./ln-rpc";
import { JsonBuffer } from "../general";

export interface GenSeedRequest {
  aezeedPassphrase?: Buffer | string | JsonBuffer;
  seedEntropy?: Buffer | string | JsonBuffer;
}

export interface GenSeedResponse {
  cipherSeedMnemonic: string[];
  encipheredSeed: Buffer | string | JsonBuffer;
}

export interface InitWalletRequest {
  walletPassword: Buffer | string | JsonBuffer;
  cipherSeedMnemonic: string[];
  aezeedPassphrase?: Buffer | string | JsonBuffer;
  recoveryWindow?: number;
  channelBackups?: ChanBackupSnapshot;
  statelessInit: boolean;
  extendedMasterKey: string;
  extendedMasterKeyBirthdayTimestamp: number;
  watchOnly?: WatchOnly;
}

export interface WatchOnly {
  masterKeyBirthdayTimestamp: number;
  masterKeyFingerprint: Buffer | string | JsonBuffer;
  accounts: Array<WatchOnlyAccount>;
}

export interface WatchOnlyAccount {
  purpose: number;
  coinType: number;
  account: number;
  xpub: string;
}

export interface UnlockWalletRequest {
  walletPassword: Buffer | string | JsonBuffer;
  recoveryWindow?: number;
  channelBackups?: ChanBackupSnapshot;
  statelessInit: boolean;
}

export interface ChangePasswordResponse {
  adminMacaroon: Buffer | string | JsonBuffer;
}

export interface ChangePasswordRequest {
  currentPassword: Buffer | string | JsonBuffer;
  newPassword: Buffer | string | JsonBuffer;
}

/**
 * LND WalletUnlocker gRPC API Client
 */
export interface WalletUnlockerRpc {
  /**
   * genSeed is the first method that should be used to instantiate a new lnd instance. This method allows a caller
   * to generate a new aezeed cipher seed given an optional passphrase. If provided, the passphrase will be
   * necessary to decrypt the cipherseed to expose the internal wallet seed. Once the cipherseed is obtained and
   * verified by the user, the initWallet method should be used to commit the newly generated seed, and create the
   * wallet.
   */
  genSeed(args: GenSeedRequest): Promise<GenSeedResponse>;

  /**
   *
   * initWallet is used when lnd is starting up for the first time to fully initialize the daemon and its internal
   * wallet. At the very least a wallet password must be provided. This will be used to encrypt sensitive material
   * on disk. In the case of a recovery scenario, the user can also specify their aezeed mnemonic and passphrase.
   * If set, then the daemon will use this prior state to initialize its internal wallet. Alternatively, this can
   * be used along with the genSeed RPC to obtain a seed, then present it to the user. Once it has been verified by
   * the user, the seed can be fed into this RPC in order to commit the new wallet.
   */
  initWallet(args: InitWalletRequest): Promise<{}>;

  /**
   * unlockWallet is used at startup of lnd to provide a password to unlock the wallet database.
   */
  unlockWallet(args: UnlockWalletRequest): Promise<{}>;

  /**
   * changePassword changes the password of the encrypted wallet. This will automatically unlock the wallet
   * database if successful.
   */
  changePassword(args: ChangePasswordRequest): Promise<{}>;
}
