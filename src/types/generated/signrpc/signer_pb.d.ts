// package: signrpc
// file: signrpc/signer.proto

import * as jspb from "google-protobuf";

export class KeyLocator extends jspb.Message {
  getKeyFamily(): number;
  setKeyFamily(value: number): void;

  getKeyIndex(): number;
  setKeyIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyLocator.AsObject;
  static toObject(includeInstance: boolean, msg: KeyLocator): KeyLocator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyLocator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyLocator;
  static deserializeBinaryFromReader(message: KeyLocator, reader: jspb.BinaryReader): KeyLocator;
}

export namespace KeyLocator {
  export type AsObject = {
    keyFamily: number,
    keyIndex: number,
  }
}

export class KeyDescriptor extends jspb.Message {
  getRawKeyBytes(): Uint8Array | string;
  getRawKeyBytes_asU8(): Uint8Array;
  getRawKeyBytes_asB64(): string;
  setRawKeyBytes(value: Uint8Array | string): void;

  hasKeyLoc(): boolean;
  clearKeyLoc(): void;
  getKeyLoc(): KeyLocator | undefined;
  setKeyLoc(value?: KeyLocator): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: KeyDescriptor): KeyDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyDescriptor;
  static deserializeBinaryFromReader(message: KeyDescriptor, reader: jspb.BinaryReader): KeyDescriptor;
}

export namespace KeyDescriptor {
  export type AsObject = {
    rawKeyBytes: Uint8Array | string,
    keyLoc?: KeyLocator.AsObject,
  }
}

export class TxOut extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  getPkScript(): Uint8Array | string;
  getPkScript_asU8(): Uint8Array;
  getPkScript_asB64(): string;
  setPkScript(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxOut.AsObject;
  static toObject(includeInstance: boolean, msg: TxOut): TxOut.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxOut, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxOut;
  static deserializeBinaryFromReader(message: TxOut, reader: jspb.BinaryReader): TxOut;
}

export namespace TxOut {
  export type AsObject = {
    value: number,
    pkScript: Uint8Array | string,
  }
}

export class SignDescriptor extends jspb.Message {
  hasKeyDesc(): boolean;
  clearKeyDesc(): void;
  getKeyDesc(): KeyDescriptor | undefined;
  setKeyDesc(value?: KeyDescriptor): void;

  getSingleTweak(): Uint8Array | string;
  getSingleTweak_asU8(): Uint8Array;
  getSingleTweak_asB64(): string;
  setSingleTweak(value: Uint8Array | string): void;

  getDoubleTweak(): Uint8Array | string;
  getDoubleTweak_asU8(): Uint8Array;
  getDoubleTweak_asB64(): string;
  setDoubleTweak(value: Uint8Array | string): void;

  getTapTweak(): Uint8Array | string;
  getTapTweak_asU8(): Uint8Array;
  getTapTweak_asB64(): string;
  setTapTweak(value: Uint8Array | string): void;

  getWitnessScript(): Uint8Array | string;
  getWitnessScript_asU8(): Uint8Array;
  getWitnessScript_asB64(): string;
  setWitnessScript(value: Uint8Array | string): void;

  hasOutput(): boolean;
  clearOutput(): void;
  getOutput(): TxOut | undefined;
  setOutput(value?: TxOut): void;

  getSighash(): number;
  setSighash(value: number): void;

  getInputIndex(): number;
  setInputIndex(value: number): void;

  getSignMethod(): SignMethodMap[keyof SignMethodMap];
  setSignMethod(value: SignMethodMap[keyof SignMethodMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignDescriptor.AsObject;
  static toObject(includeInstance: boolean, msg: SignDescriptor): SignDescriptor.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignDescriptor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignDescriptor;
  static deserializeBinaryFromReader(message: SignDescriptor, reader: jspb.BinaryReader): SignDescriptor;
}

export namespace SignDescriptor {
  export type AsObject = {
    keyDesc?: KeyDescriptor.AsObject,
    singleTweak: Uint8Array | string,
    doubleTweak: Uint8Array | string,
    tapTweak: Uint8Array | string,
    witnessScript: Uint8Array | string,
    output?: TxOut.AsObject,
    sighash: number,
    inputIndex: number,
    signMethod: SignMethodMap[keyof SignMethodMap],
  }
}

export class SignReq extends jspb.Message {
  getRawTxBytes(): Uint8Array | string;
  getRawTxBytes_asU8(): Uint8Array;
  getRawTxBytes_asB64(): string;
  setRawTxBytes(value: Uint8Array | string): void;

  clearSignDescsList(): void;
  getSignDescsList(): Array<SignDescriptor>;
  setSignDescsList(value: Array<SignDescriptor>): void;
  addSignDescs(value?: SignDescriptor, index?: number): SignDescriptor;

  clearPrevOutputsList(): void;
  getPrevOutputsList(): Array<TxOut>;
  setPrevOutputsList(value: Array<TxOut>): void;
  addPrevOutputs(value?: TxOut, index?: number): TxOut;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignReq.AsObject;
  static toObject(includeInstance: boolean, msg: SignReq): SignReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignReq;
  static deserializeBinaryFromReader(message: SignReq, reader: jspb.BinaryReader): SignReq;
}

export namespace SignReq {
  export type AsObject = {
    rawTxBytes: Uint8Array | string,
    signDescs: Array<SignDescriptor.AsObject>,
    prevOutputs: Array<TxOut.AsObject>,
  }
}

export class SignResp extends jspb.Message {
  clearRawSigsList(): void;
  getRawSigsList(): Array<Uint8Array | string>;
  getRawSigsList_asU8(): Array<Uint8Array>;
  getRawSigsList_asB64(): Array<string>;
  setRawSigsList(value: Array<Uint8Array | string>): void;
  addRawSigs(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignResp.AsObject;
  static toObject(includeInstance: boolean, msg: SignResp): SignResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignResp;
  static deserializeBinaryFromReader(message: SignResp, reader: jspb.BinaryReader): SignResp;
}

export namespace SignResp {
  export type AsObject = {
    rawSigs: Array<Uint8Array | string>,
  }
}

export class InputScript extends jspb.Message {
  clearWitnessList(): void;
  getWitnessList(): Array<Uint8Array | string>;
  getWitnessList_asU8(): Array<Uint8Array>;
  getWitnessList_asB64(): Array<string>;
  setWitnessList(value: Array<Uint8Array | string>): void;
  addWitness(value: Uint8Array | string, index?: number): Uint8Array | string;

  getSigScript(): Uint8Array | string;
  getSigScript_asU8(): Uint8Array;
  getSigScript_asB64(): string;
  setSigScript(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InputScript.AsObject;
  static toObject(includeInstance: boolean, msg: InputScript): InputScript.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InputScript, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InputScript;
  static deserializeBinaryFromReader(message: InputScript, reader: jspb.BinaryReader): InputScript;
}

export namespace InputScript {
  export type AsObject = {
    witness: Array<Uint8Array | string>,
    sigScript: Uint8Array | string,
  }
}

export class InputScriptResp extends jspb.Message {
  clearInputScriptsList(): void;
  getInputScriptsList(): Array<InputScript>;
  setInputScriptsList(value: Array<InputScript>): void;
  addInputScripts(value?: InputScript, index?: number): InputScript;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InputScriptResp.AsObject;
  static toObject(includeInstance: boolean, msg: InputScriptResp): InputScriptResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InputScriptResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InputScriptResp;
  static deserializeBinaryFromReader(message: InputScriptResp, reader: jspb.BinaryReader): InputScriptResp;
}

export namespace InputScriptResp {
  export type AsObject = {
    inputScripts: Array<InputScript.AsObject>,
  }
}

export class SignMessageReq extends jspb.Message {
  getMsg(): Uint8Array | string;
  getMsg_asU8(): Uint8Array;
  getMsg_asB64(): string;
  setMsg(value: Uint8Array | string): void;

  hasKeyLoc(): boolean;
  clearKeyLoc(): void;
  getKeyLoc(): KeyLocator | undefined;
  setKeyLoc(value?: KeyLocator): void;

  getDoubleHash(): boolean;
  setDoubleHash(value: boolean): void;

  getCompactSig(): boolean;
  setCompactSig(value: boolean): void;

  getSchnorrSig(): boolean;
  setSchnorrSig(value: boolean): void;

  getSchnorrSigTapTweak(): Uint8Array | string;
  getSchnorrSigTapTweak_asU8(): Uint8Array;
  getSchnorrSigTapTweak_asB64(): string;
  setSchnorrSigTapTweak(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignMessageReq.AsObject;
  static toObject(includeInstance: boolean, msg: SignMessageReq): SignMessageReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignMessageReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignMessageReq;
  static deserializeBinaryFromReader(message: SignMessageReq, reader: jspb.BinaryReader): SignMessageReq;
}

export namespace SignMessageReq {
  export type AsObject = {
    msg: Uint8Array | string,
    keyLoc?: KeyLocator.AsObject,
    doubleHash: boolean,
    compactSig: boolean,
    schnorrSig: boolean,
    schnorrSigTapTweak: Uint8Array | string,
  }
}

export class SignMessageResp extends jspb.Message {
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignMessageResp.AsObject;
  static toObject(includeInstance: boolean, msg: SignMessageResp): SignMessageResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignMessageResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignMessageResp;
  static deserializeBinaryFromReader(message: SignMessageResp, reader: jspb.BinaryReader): SignMessageResp;
}

export namespace SignMessageResp {
  export type AsObject = {
    signature: Uint8Array | string,
  }
}

export class VerifyMessageReq extends jspb.Message {
  getMsg(): Uint8Array | string;
  getMsg_asU8(): Uint8Array;
  getMsg_asB64(): string;
  setMsg(value: Uint8Array | string): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getPubkey(): Uint8Array | string;
  getPubkey_asU8(): Uint8Array;
  getPubkey_asB64(): string;
  setPubkey(value: Uint8Array | string): void;

  getIsSchnorrSig(): boolean;
  setIsSchnorrSig(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyMessageReq.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyMessageReq): VerifyMessageReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VerifyMessageReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyMessageReq;
  static deserializeBinaryFromReader(message: VerifyMessageReq, reader: jspb.BinaryReader): VerifyMessageReq;
}

export namespace VerifyMessageReq {
  export type AsObject = {
    msg: Uint8Array | string,
    signature: Uint8Array | string,
    pubkey: Uint8Array | string,
    isSchnorrSig: boolean,
  }
}

export class VerifyMessageResp extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyMessageResp.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyMessageResp): VerifyMessageResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VerifyMessageResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyMessageResp;
  static deserializeBinaryFromReader(message: VerifyMessageResp, reader: jspb.BinaryReader): VerifyMessageResp;
}

export namespace VerifyMessageResp {
  export type AsObject = {
    valid: boolean,
  }
}

export class SharedKeyRequest extends jspb.Message {
  getEphemeralPubkey(): Uint8Array | string;
  getEphemeralPubkey_asU8(): Uint8Array;
  getEphemeralPubkey_asB64(): string;
  setEphemeralPubkey(value: Uint8Array | string): void;

  hasKeyLoc(): boolean;
  clearKeyLoc(): void;
  getKeyLoc(): KeyLocator | undefined;
  setKeyLoc(value?: KeyLocator): void;

  hasKeyDesc(): boolean;
  clearKeyDesc(): void;
  getKeyDesc(): KeyDescriptor | undefined;
  setKeyDesc(value?: KeyDescriptor): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SharedKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SharedKeyRequest): SharedKeyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SharedKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SharedKeyRequest;
  static deserializeBinaryFromReader(message: SharedKeyRequest, reader: jspb.BinaryReader): SharedKeyRequest;
}

export namespace SharedKeyRequest {
  export type AsObject = {
    ephemeralPubkey: Uint8Array | string,
    keyLoc?: KeyLocator.AsObject,
    keyDesc?: KeyDescriptor.AsObject,
  }
}

export class SharedKeyResponse extends jspb.Message {
  getSharedKey(): Uint8Array | string;
  getSharedKey_asU8(): Uint8Array;
  getSharedKey_asB64(): string;
  setSharedKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SharedKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SharedKeyResponse): SharedKeyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SharedKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SharedKeyResponse;
  static deserializeBinaryFromReader(message: SharedKeyResponse, reader: jspb.BinaryReader): SharedKeyResponse;
}

export namespace SharedKeyResponse {
  export type AsObject = {
    sharedKey: Uint8Array | string,
  }
}

export class TweakDesc extends jspb.Message {
  getTweak(): Uint8Array | string;
  getTweak_asU8(): Uint8Array;
  getTweak_asB64(): string;
  setTweak(value: Uint8Array | string): void;

  getIsXOnly(): boolean;
  setIsXOnly(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TweakDesc.AsObject;
  static toObject(includeInstance: boolean, msg: TweakDesc): TweakDesc.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TweakDesc, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TweakDesc;
  static deserializeBinaryFromReader(message: TweakDesc, reader: jspb.BinaryReader): TweakDesc;
}

export namespace TweakDesc {
  export type AsObject = {
    tweak: Uint8Array | string,
    isXOnly: boolean,
  }
}

export class TaprootTweakDesc extends jspb.Message {
  getScriptRoot(): Uint8Array | string;
  getScriptRoot_asU8(): Uint8Array;
  getScriptRoot_asB64(): string;
  setScriptRoot(value: Uint8Array | string): void;

  getKeySpendOnly(): boolean;
  setKeySpendOnly(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TaprootTweakDesc.AsObject;
  static toObject(includeInstance: boolean, msg: TaprootTweakDesc): TaprootTweakDesc.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TaprootTweakDesc, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TaprootTweakDesc;
  static deserializeBinaryFromReader(message: TaprootTweakDesc, reader: jspb.BinaryReader): TaprootTweakDesc;
}

export namespace TaprootTweakDesc {
  export type AsObject = {
    scriptRoot: Uint8Array | string,
    keySpendOnly: boolean,
  }
}

export class MuSig2CombineKeysRequest extends jspb.Message {
  clearAllSignerPubkeysList(): void;
  getAllSignerPubkeysList(): Array<Uint8Array | string>;
  getAllSignerPubkeysList_asU8(): Array<Uint8Array>;
  getAllSignerPubkeysList_asB64(): Array<string>;
  setAllSignerPubkeysList(value: Array<Uint8Array | string>): void;
  addAllSignerPubkeys(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearTweaksList(): void;
  getTweaksList(): Array<TweakDesc>;
  setTweaksList(value: Array<TweakDesc>): void;
  addTweaks(value?: TweakDesc, index?: number): TweakDesc;

  hasTaprootTweak(): boolean;
  clearTaprootTweak(): void;
  getTaprootTweak(): TaprootTweakDesc | undefined;
  setTaprootTweak(value?: TaprootTweakDesc): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2CombineKeysRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2CombineKeysRequest): MuSig2CombineKeysRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2CombineKeysRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2CombineKeysRequest;
  static deserializeBinaryFromReader(message: MuSig2CombineKeysRequest, reader: jspb.BinaryReader): MuSig2CombineKeysRequest;
}

export namespace MuSig2CombineKeysRequest {
  export type AsObject = {
    allSignerPubkeys: Array<Uint8Array | string>,
    tweaks: Array<TweakDesc.AsObject>,
    taprootTweak?: TaprootTweakDesc.AsObject,
  }
}

export class MuSig2CombineKeysResponse extends jspb.Message {
  getCombinedKey(): Uint8Array | string;
  getCombinedKey_asU8(): Uint8Array;
  getCombinedKey_asB64(): string;
  setCombinedKey(value: Uint8Array | string): void;

  getTaprootInternalKey(): Uint8Array | string;
  getTaprootInternalKey_asU8(): Uint8Array;
  getTaprootInternalKey_asB64(): string;
  setTaprootInternalKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2CombineKeysResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2CombineKeysResponse): MuSig2CombineKeysResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2CombineKeysResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2CombineKeysResponse;
  static deserializeBinaryFromReader(message: MuSig2CombineKeysResponse, reader: jspb.BinaryReader): MuSig2CombineKeysResponse;
}

export namespace MuSig2CombineKeysResponse {
  export type AsObject = {
    combinedKey: Uint8Array | string,
    taprootInternalKey: Uint8Array | string,
  }
}

export class MuSig2SessionRequest extends jspb.Message {
  hasKeyLoc(): boolean;
  clearKeyLoc(): void;
  getKeyLoc(): KeyLocator | undefined;
  setKeyLoc(value?: KeyLocator): void;

  clearAllSignerPubkeysList(): void;
  getAllSignerPubkeysList(): Array<Uint8Array | string>;
  getAllSignerPubkeysList_asU8(): Array<Uint8Array>;
  getAllSignerPubkeysList_asB64(): Array<string>;
  setAllSignerPubkeysList(value: Array<Uint8Array | string>): void;
  addAllSignerPubkeys(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearOtherSignerPublicNoncesList(): void;
  getOtherSignerPublicNoncesList(): Array<Uint8Array | string>;
  getOtherSignerPublicNoncesList_asU8(): Array<Uint8Array>;
  getOtherSignerPublicNoncesList_asB64(): Array<string>;
  setOtherSignerPublicNoncesList(value: Array<Uint8Array | string>): void;
  addOtherSignerPublicNonces(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearTweaksList(): void;
  getTweaksList(): Array<TweakDesc>;
  setTweaksList(value: Array<TweakDesc>): void;
  addTweaks(value?: TweakDesc, index?: number): TweakDesc;

  hasTaprootTweak(): boolean;
  clearTaprootTweak(): void;
  getTaprootTweak(): TaprootTweakDesc | undefined;
  setTaprootTweak(value?: TaprootTweakDesc): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2SessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2SessionRequest): MuSig2SessionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2SessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2SessionRequest;
  static deserializeBinaryFromReader(message: MuSig2SessionRequest, reader: jspb.BinaryReader): MuSig2SessionRequest;
}

export namespace MuSig2SessionRequest {
  export type AsObject = {
    keyLoc?: KeyLocator.AsObject,
    allSignerPubkeys: Array<Uint8Array | string>,
    otherSignerPublicNonces: Array<Uint8Array | string>,
    tweaks: Array<TweakDesc.AsObject>,
    taprootTweak?: TaprootTweakDesc.AsObject,
  }
}

export class MuSig2SessionResponse extends jspb.Message {
  getSessionId(): Uint8Array | string;
  getSessionId_asU8(): Uint8Array;
  getSessionId_asB64(): string;
  setSessionId(value: Uint8Array | string): void;

  getCombinedKey(): Uint8Array | string;
  getCombinedKey_asU8(): Uint8Array;
  getCombinedKey_asB64(): string;
  setCombinedKey(value: Uint8Array | string): void;

  getTaprootInternalKey(): Uint8Array | string;
  getTaprootInternalKey_asU8(): Uint8Array;
  getTaprootInternalKey_asB64(): string;
  setTaprootInternalKey(value: Uint8Array | string): void;

  getLocalPublicNonces(): Uint8Array | string;
  getLocalPublicNonces_asU8(): Uint8Array;
  getLocalPublicNonces_asB64(): string;
  setLocalPublicNonces(value: Uint8Array | string): void;

  getHaveAllNonces(): boolean;
  setHaveAllNonces(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2SessionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2SessionResponse): MuSig2SessionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2SessionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2SessionResponse;
  static deserializeBinaryFromReader(message: MuSig2SessionResponse, reader: jspb.BinaryReader): MuSig2SessionResponse;
}

export namespace MuSig2SessionResponse {
  export type AsObject = {
    sessionId: Uint8Array | string,
    combinedKey: Uint8Array | string,
    taprootInternalKey: Uint8Array | string,
    localPublicNonces: Uint8Array | string,
    haveAllNonces: boolean,
  }
}

export class MuSig2RegisterNoncesRequest extends jspb.Message {
  getSessionId(): Uint8Array | string;
  getSessionId_asU8(): Uint8Array;
  getSessionId_asB64(): string;
  setSessionId(value: Uint8Array | string): void;

  clearOtherSignerPublicNoncesList(): void;
  getOtherSignerPublicNoncesList(): Array<Uint8Array | string>;
  getOtherSignerPublicNoncesList_asU8(): Array<Uint8Array>;
  getOtherSignerPublicNoncesList_asB64(): Array<string>;
  setOtherSignerPublicNoncesList(value: Array<Uint8Array | string>): void;
  addOtherSignerPublicNonces(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2RegisterNoncesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2RegisterNoncesRequest): MuSig2RegisterNoncesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2RegisterNoncesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2RegisterNoncesRequest;
  static deserializeBinaryFromReader(message: MuSig2RegisterNoncesRequest, reader: jspb.BinaryReader): MuSig2RegisterNoncesRequest;
}

export namespace MuSig2RegisterNoncesRequest {
  export type AsObject = {
    sessionId: Uint8Array | string,
    otherSignerPublicNonces: Array<Uint8Array | string>,
  }
}

export class MuSig2RegisterNoncesResponse extends jspb.Message {
  getHaveAllNonces(): boolean;
  setHaveAllNonces(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2RegisterNoncesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2RegisterNoncesResponse): MuSig2RegisterNoncesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2RegisterNoncesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2RegisterNoncesResponse;
  static deserializeBinaryFromReader(message: MuSig2RegisterNoncesResponse, reader: jspb.BinaryReader): MuSig2RegisterNoncesResponse;
}

export namespace MuSig2RegisterNoncesResponse {
  export type AsObject = {
    haveAllNonces: boolean,
  }
}

export class MuSig2SignRequest extends jspb.Message {
  getSessionId(): Uint8Array | string;
  getSessionId_asU8(): Uint8Array;
  getSessionId_asB64(): string;
  setSessionId(value: Uint8Array | string): void;

  getMessageDigest(): Uint8Array | string;
  getMessageDigest_asU8(): Uint8Array;
  getMessageDigest_asB64(): string;
  setMessageDigest(value: Uint8Array | string): void;

  getCleanup(): boolean;
  setCleanup(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2SignRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2SignRequest): MuSig2SignRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2SignRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2SignRequest;
  static deserializeBinaryFromReader(message: MuSig2SignRequest, reader: jspb.BinaryReader): MuSig2SignRequest;
}

export namespace MuSig2SignRequest {
  export type AsObject = {
    sessionId: Uint8Array | string,
    messageDigest: Uint8Array | string,
    cleanup: boolean,
  }
}

export class MuSig2SignResponse extends jspb.Message {
  getLocalPartialSignature(): Uint8Array | string;
  getLocalPartialSignature_asU8(): Uint8Array;
  getLocalPartialSignature_asB64(): string;
  setLocalPartialSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2SignResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2SignResponse): MuSig2SignResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2SignResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2SignResponse;
  static deserializeBinaryFromReader(message: MuSig2SignResponse, reader: jspb.BinaryReader): MuSig2SignResponse;
}

export namespace MuSig2SignResponse {
  export type AsObject = {
    localPartialSignature: Uint8Array | string,
  }
}

export class MuSig2CombineSigRequest extends jspb.Message {
  getSessionId(): Uint8Array | string;
  getSessionId_asU8(): Uint8Array;
  getSessionId_asB64(): string;
  setSessionId(value: Uint8Array | string): void;

  clearOtherPartialSignaturesList(): void;
  getOtherPartialSignaturesList(): Array<Uint8Array | string>;
  getOtherPartialSignaturesList_asU8(): Array<Uint8Array>;
  getOtherPartialSignaturesList_asB64(): Array<string>;
  setOtherPartialSignaturesList(value: Array<Uint8Array | string>): void;
  addOtherPartialSignatures(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2CombineSigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2CombineSigRequest): MuSig2CombineSigRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2CombineSigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2CombineSigRequest;
  static deserializeBinaryFromReader(message: MuSig2CombineSigRequest, reader: jspb.BinaryReader): MuSig2CombineSigRequest;
}

export namespace MuSig2CombineSigRequest {
  export type AsObject = {
    sessionId: Uint8Array | string,
    otherPartialSignatures: Array<Uint8Array | string>,
  }
}

export class MuSig2CombineSigResponse extends jspb.Message {
  getHaveAllSignatures(): boolean;
  setHaveAllSignatures(value: boolean): void;

  getFinalSignature(): Uint8Array | string;
  getFinalSignature_asU8(): Uint8Array;
  getFinalSignature_asB64(): string;
  setFinalSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2CombineSigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2CombineSigResponse): MuSig2CombineSigResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2CombineSigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2CombineSigResponse;
  static deserializeBinaryFromReader(message: MuSig2CombineSigResponse, reader: jspb.BinaryReader): MuSig2CombineSigResponse;
}

export namespace MuSig2CombineSigResponse {
  export type AsObject = {
    haveAllSignatures: boolean,
    finalSignature: Uint8Array | string,
  }
}

export class MuSig2CleanupRequest extends jspb.Message {
  getSessionId(): Uint8Array | string;
  getSessionId_asU8(): Uint8Array;
  getSessionId_asB64(): string;
  setSessionId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2CleanupRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2CleanupRequest): MuSig2CleanupRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2CleanupRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2CleanupRequest;
  static deserializeBinaryFromReader(message: MuSig2CleanupRequest, reader: jspb.BinaryReader): MuSig2CleanupRequest;
}

export namespace MuSig2CleanupRequest {
  export type AsObject = {
    sessionId: Uint8Array | string,
  }
}

export class MuSig2CleanupResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MuSig2CleanupResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MuSig2CleanupResponse): MuSig2CleanupResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MuSig2CleanupResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MuSig2CleanupResponse;
  static deserializeBinaryFromReader(message: MuSig2CleanupResponse, reader: jspb.BinaryReader): MuSig2CleanupResponse;
}

export namespace MuSig2CleanupResponse {
  export type AsObject = {
  }
}

export interface SignMethodMap {
  SIGN_METHOD_WITNESS_V0: 0;
  SIGN_METHOD_TAPROOT_KEY_SPEND_BIP0086: 1;
  SIGN_METHOD_TAPROOT_KEY_SPEND: 2;
  SIGN_METHOD_TAPROOT_SCRIPT_SPEND: 3;
}

export const SignMethod: SignMethodMap;

