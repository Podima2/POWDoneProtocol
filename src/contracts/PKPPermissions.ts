/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace PKPPermissions {
  export type AuthMethodStruct = {
    authMethodType: BigNumberish;
    id: BytesLike;
    userPubkey: BytesLike;
  };

  export type AuthMethodStructOutput = [
    authMethodType: bigint,
    id: string,
    userPubkey: string
  ] & { authMethodType: bigint; id: string; userPubkey: string };
}

export interface PKPPermissionsInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addPermittedAction"
      | "addPermittedAddress"
      | "addPermittedAuthMethod"
      | "addPermittedAuthMethodScope"
      | "authMethods"
      | "getAuthMethodId"
      | "getEthAddress"
      | "getPermittedActions"
      | "getPermittedAddresses"
      | "getPermittedAuthMethodScopes"
      | "getPermittedAuthMethods"
      | "getPubkey"
      | "getTokenIdsForAuthMethod"
      | "getUserPubkeyForAuthMethod"
      | "isPermittedAction"
      | "isPermittedAddress"
      | "isPermittedAuthMethod"
      | "isPermittedAuthMethodScopePresent"
      | "owner"
      | "pkpNFT"
      | "removePermittedAction"
      | "removePermittedAddress"
      | "removePermittedAuthMethod"
      | "removePermittedAuthMethodScope"
      | "renounceOwnership"
      | "setPkpNftAddress"
      | "setRootHash"
      | "transferOwnership"
      | "verifyState"
      | "verifyStates"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "OwnershipTransferred"
      | "PermittedAuthMethodAdded"
      | "PermittedAuthMethodRemoved"
      | "PermittedAuthMethodScopeAdded"
      | "PermittedAuthMethodScopeRemoved"
      | "RootHashUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addPermittedAction",
    values: [BigNumberish, BytesLike, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addPermittedAddress",
    values: [BigNumberish, AddressLike, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addPermittedAuthMethod",
    values: [BigNumberish, PKPPermissions.AuthMethodStruct, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addPermittedAuthMethodScope",
    values: [BigNumberish, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "authMethods",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuthMethodId",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getEthAddress",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPermittedActions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPermittedAddresses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPermittedAuthMethodScopes",
    values: [BigNumberish, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPermittedAuthMethods",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPubkey",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenIdsForAuthMethod",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserPubkeyForAuthMethod",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isPermittedAction",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isPermittedAddress",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isPermittedAuthMethod",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isPermittedAuthMethodScopePresent",
    values: [BigNumberish, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pkpNFT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removePermittedAction",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removePermittedAddress",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removePermittedAuthMethod",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removePermittedAuthMethodScope",
    values: [BigNumberish, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPkpNftAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setRootHash",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyState",
    values: [BigNumberish, BigNumberish, BytesLike[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyStates",
    values: [BigNumberish, BigNumberish, BytesLike[], boolean[], BytesLike[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "addPermittedAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addPermittedAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addPermittedAuthMethod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addPermittedAuthMethodScope",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authMethods",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuthMethodId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEthAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPermittedActions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPermittedAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPermittedAuthMethodScopes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPermittedAuthMethods",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPubkey", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTokenIdsForAuthMethod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserPubkeyForAuthMethod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPermittedAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPermittedAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPermittedAuthMethod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPermittedAuthMethodScopePresent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pkpNFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removePermittedAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removePermittedAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removePermittedAuthMethod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removePermittedAuthMethodScope",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPkpNftAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRootHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyStates",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PermittedAuthMethodAddedEvent {
  export type InputTuple = [
    tokenId: BigNumberish,
    authMethodType: BigNumberish,
    id: BytesLike,
    userPubkey: BytesLike
  ];
  export type OutputTuple = [
    tokenId: bigint,
    authMethodType: bigint,
    id: string,
    userPubkey: string
  ];
  export interface OutputObject {
    tokenId: bigint;
    authMethodType: bigint;
    id: string;
    userPubkey: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PermittedAuthMethodRemovedEvent {
  export type InputTuple = [
    tokenId: BigNumberish,
    authMethodType: BigNumberish,
    id: BytesLike
  ];
  export type OutputTuple = [
    tokenId: bigint,
    authMethodType: bigint,
    id: string
  ];
  export interface OutputObject {
    tokenId: bigint;
    authMethodType: bigint;
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PermittedAuthMethodScopeAddedEvent {
  export type InputTuple = [
    tokenId: BigNumberish,
    authMethodType: BigNumberish,
    id: BytesLike,
    scopeId: BigNumberish
  ];
  export type OutputTuple = [
    tokenId: bigint,
    authMethodType: bigint,
    id: string,
    scopeId: bigint
  ];
  export interface OutputObject {
    tokenId: bigint;
    authMethodType: bigint;
    id: string;
    scopeId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PermittedAuthMethodScopeRemovedEvent {
  export type InputTuple = [
    tokenId: BigNumberish,
    authMethodType: BigNumberish,
    id: BytesLike,
    scopeId: BigNumberish
  ];
  export type OutputTuple = [
    tokenId: bigint,
    authMethodType: bigint,
    id: string,
    scopeId: bigint
  ];
  export interface OutputObject {
    tokenId: bigint;
    authMethodType: bigint;
    id: string;
    scopeId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RootHashUpdatedEvent {
  export type InputTuple = [
    tokenId: BigNumberish,
    group: BigNumberish,
    root: BytesLike
  ];
  export type OutputTuple = [tokenId: bigint, group: bigint, root: string];
  export interface OutputObject {
    tokenId: bigint;
    group: bigint;
    root: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PKPPermissions extends BaseContract {
  connect(runner?: ContractRunner | null): PKPPermissions;
  waitForDeployment(): Promise<this>;

  interface: PKPPermissionsInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addPermittedAction: TypedContractMethod<
    [tokenId: BigNumberish, ipfsCID: BytesLike, scopes: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  addPermittedAddress: TypedContractMethod<
    [tokenId: BigNumberish, user: AddressLike, scopes: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  addPermittedAuthMethod: TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethod: PKPPermissions.AuthMethodStruct,
      scopes: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;

  addPermittedAuthMethodScope: TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      scopeId: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  authMethods: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string] & {
        authMethodType: bigint;
        id: string;
        userPubkey: string;
      }
    ],
    "view"
  >;

  getAuthMethodId: TypedContractMethod<
    [authMethodType: BigNumberish, id: BytesLike],
    [bigint],
    "view"
  >;

  getEthAddress: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  getPermittedActions: TypedContractMethod<
    [tokenId: BigNumberish],
    [string[]],
    "view"
  >;

  getPermittedAddresses: TypedContractMethod<
    [tokenId: BigNumberish],
    [string[]],
    "view"
  >;

  getPermittedAuthMethodScopes: TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      maxScopeId: BigNumberish
    ],
    [boolean[]],
    "view"
  >;

  getPermittedAuthMethods: TypedContractMethod<
    [tokenId: BigNumberish],
    [PKPPermissions.AuthMethodStructOutput[]],
    "view"
  >;

  getPubkey: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;

  getTokenIdsForAuthMethod: TypedContractMethod<
    [authMethodType: BigNumberish, id: BytesLike],
    [bigint[]],
    "view"
  >;

  getUserPubkeyForAuthMethod: TypedContractMethod<
    [authMethodType: BigNumberish, id: BytesLike],
    [string],
    "view"
  >;

  isPermittedAction: TypedContractMethod<
    [tokenId: BigNumberish, ipfsCID: BytesLike],
    [boolean],
    "view"
  >;

  isPermittedAddress: TypedContractMethod<
    [tokenId: BigNumberish, user: AddressLike],
    [boolean],
    "view"
  >;

  isPermittedAuthMethod: TypedContractMethod<
    [tokenId: BigNumberish, authMethodType: BigNumberish, id: BytesLike],
    [boolean],
    "view"
  >;

  isPermittedAuthMethodScopePresent: TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      scopeId: BigNumberish
    ],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pkpNFT: TypedContractMethod<[], [string], "view">;

  removePermittedAction: TypedContractMethod<
    [tokenId: BigNumberish, ipfsCID: BytesLike],
    [void],
    "nonpayable"
  >;

  removePermittedAddress: TypedContractMethod<
    [tokenId: BigNumberish, user: AddressLike],
    [void],
    "nonpayable"
  >;

  removePermittedAuthMethod: TypedContractMethod<
    [tokenId: BigNumberish, authMethodType: BigNumberish, id: BytesLike],
    [void],
    "nonpayable"
  >;

  removePermittedAuthMethodScope: TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      scopeId: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setPkpNftAddress: TypedContractMethod<
    [newPkpNftAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  setRootHash: TypedContractMethod<
    [tokenId: BigNumberish, group: BigNumberish, root: BytesLike],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  verifyState: TypedContractMethod<
    [
      tokenId: BigNumberish,
      group: BigNumberish,
      proof: BytesLike[],
      leaf: BytesLike
    ],
    [boolean],
    "view"
  >;

  verifyStates: TypedContractMethod<
    [
      tokenId: BigNumberish,
      group: BigNumberish,
      proof: BytesLike[],
      proofFlags: boolean[],
      leaves: BytesLike[]
    ],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addPermittedAction"
  ): TypedContractMethod<
    [tokenId: BigNumberish, ipfsCID: BytesLike, scopes: BigNumberish[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addPermittedAddress"
  ): TypedContractMethod<
    [tokenId: BigNumberish, user: AddressLike, scopes: BigNumberish[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addPermittedAuthMethod"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethod: PKPPermissions.AuthMethodStruct,
      scopes: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addPermittedAuthMethodScope"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      scopeId: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "authMethods"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string] & {
        authMethodType: bigint;
        id: string;
        userPubkey: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getAuthMethodId"
  ): TypedContractMethod<
    [authMethodType: BigNumberish, id: BytesLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getEthAddress"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getPermittedActions"
  ): TypedContractMethod<[tokenId: BigNumberish], [string[]], "view">;
  getFunction(
    nameOrSignature: "getPermittedAddresses"
  ): TypedContractMethod<[tokenId: BigNumberish], [string[]], "view">;
  getFunction(
    nameOrSignature: "getPermittedAuthMethodScopes"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      maxScopeId: BigNumberish
    ],
    [boolean[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPermittedAuthMethods"
  ): TypedContractMethod<
    [tokenId: BigNumberish],
    [PKPPermissions.AuthMethodStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPubkey"
  ): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getTokenIdsForAuthMethod"
  ): TypedContractMethod<
    [authMethodType: BigNumberish, id: BytesLike],
    [bigint[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserPubkeyForAuthMethod"
  ): TypedContractMethod<
    [authMethodType: BigNumberish, id: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "isPermittedAction"
  ): TypedContractMethod<
    [tokenId: BigNumberish, ipfsCID: BytesLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isPermittedAddress"
  ): TypedContractMethod<
    [tokenId: BigNumberish, user: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isPermittedAuthMethod"
  ): TypedContractMethod<
    [tokenId: BigNumberish, authMethodType: BigNumberish, id: BytesLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isPermittedAuthMethodScopePresent"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      scopeId: BigNumberish
    ],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pkpNFT"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "removePermittedAction"
  ): TypedContractMethod<
    [tokenId: BigNumberish, ipfsCID: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removePermittedAddress"
  ): TypedContractMethod<
    [tokenId: BigNumberish, user: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removePermittedAuthMethod"
  ): TypedContractMethod<
    [tokenId: BigNumberish, authMethodType: BigNumberish, id: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removePermittedAuthMethodScope"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      authMethodType: BigNumberish,
      id: BytesLike,
      scopeId: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPkpNftAddress"
  ): TypedContractMethod<[newPkpNftAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setRootHash"
  ): TypedContractMethod<
    [tokenId: BigNumberish, group: BigNumberish, root: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verifyState"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      group: BigNumberish,
      proof: BytesLike[],
      leaf: BytesLike
    ],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "verifyStates"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
      group: BigNumberish,
      proof: BytesLike[],
      proofFlags: boolean[],
      leaves: BytesLike[]
    ],
    [boolean],
    "view"
  >;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "PermittedAuthMethodAdded"
  ): TypedContractEvent<
    PermittedAuthMethodAddedEvent.InputTuple,
    PermittedAuthMethodAddedEvent.OutputTuple,
    PermittedAuthMethodAddedEvent.OutputObject
  >;
  getEvent(
    key: "PermittedAuthMethodRemoved"
  ): TypedContractEvent<
    PermittedAuthMethodRemovedEvent.InputTuple,
    PermittedAuthMethodRemovedEvent.OutputTuple,
    PermittedAuthMethodRemovedEvent.OutputObject
  >;
  getEvent(
    key: "PermittedAuthMethodScopeAdded"
  ): TypedContractEvent<
    PermittedAuthMethodScopeAddedEvent.InputTuple,
    PermittedAuthMethodScopeAddedEvent.OutputTuple,
    PermittedAuthMethodScopeAddedEvent.OutputObject
  >;
  getEvent(
    key: "PermittedAuthMethodScopeRemoved"
  ): TypedContractEvent<
    PermittedAuthMethodScopeRemovedEvent.InputTuple,
    PermittedAuthMethodScopeRemovedEvent.OutputTuple,
    PermittedAuthMethodScopeRemovedEvent.OutputObject
  >;
  getEvent(
    key: "RootHashUpdated"
  ): TypedContractEvent<
    RootHashUpdatedEvent.InputTuple,
    RootHashUpdatedEvent.OutputTuple,
    RootHashUpdatedEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "PermittedAuthMethodAdded(uint256,uint256,bytes,bytes)": TypedContractEvent<
      PermittedAuthMethodAddedEvent.InputTuple,
      PermittedAuthMethodAddedEvent.OutputTuple,
      PermittedAuthMethodAddedEvent.OutputObject
    >;
    PermittedAuthMethodAdded: TypedContractEvent<
      PermittedAuthMethodAddedEvent.InputTuple,
      PermittedAuthMethodAddedEvent.OutputTuple,
      PermittedAuthMethodAddedEvent.OutputObject
    >;

    "PermittedAuthMethodRemoved(uint256,uint256,bytes)": TypedContractEvent<
      PermittedAuthMethodRemovedEvent.InputTuple,
      PermittedAuthMethodRemovedEvent.OutputTuple,
      PermittedAuthMethodRemovedEvent.OutputObject
    >;
    PermittedAuthMethodRemoved: TypedContractEvent<
      PermittedAuthMethodRemovedEvent.InputTuple,
      PermittedAuthMethodRemovedEvent.OutputTuple,
      PermittedAuthMethodRemovedEvent.OutputObject
    >;

    "PermittedAuthMethodScopeAdded(uint256,uint256,bytes,uint256)": TypedContractEvent<
      PermittedAuthMethodScopeAddedEvent.InputTuple,
      PermittedAuthMethodScopeAddedEvent.OutputTuple,
      PermittedAuthMethodScopeAddedEvent.OutputObject
    >;
    PermittedAuthMethodScopeAdded: TypedContractEvent<
      PermittedAuthMethodScopeAddedEvent.InputTuple,
      PermittedAuthMethodScopeAddedEvent.OutputTuple,
      PermittedAuthMethodScopeAddedEvent.OutputObject
    >;

    "PermittedAuthMethodScopeRemoved(uint256,uint256,bytes,uint256)": TypedContractEvent<
      PermittedAuthMethodScopeRemovedEvent.InputTuple,
      PermittedAuthMethodScopeRemovedEvent.OutputTuple,
      PermittedAuthMethodScopeRemovedEvent.OutputObject
    >;
    PermittedAuthMethodScopeRemoved: TypedContractEvent<
      PermittedAuthMethodScopeRemovedEvent.InputTuple,
      PermittedAuthMethodScopeRemovedEvent.OutputTuple,
      PermittedAuthMethodScopeRemovedEvent.OutputObject
    >;

    "RootHashUpdated(uint256,uint256,bytes32)": TypedContractEvent<
      RootHashUpdatedEvent.InputTuple,
      RootHashUpdatedEvent.OutputTuple,
      RootHashUpdatedEvent.OutputObject
    >;
    RootHashUpdated: TypedContractEvent<
      RootHashUpdatedEvent.InputTuple,
      RootHashUpdatedEvent.OutputTuple,
      RootHashUpdatedEvent.OutputObject
    >;
  };
}
