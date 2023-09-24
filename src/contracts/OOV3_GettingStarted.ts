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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace OptimisticOracleV3Interface {
  export type EscalationManagerSettingsStruct = {
    arbitrateViaEscalationManager: boolean;
    discardOracle: boolean;
    validateDisputers: boolean;
    assertingCaller: AddressLike;
    escalationManager: AddressLike;
  };

  export type EscalationManagerSettingsStructOutput = [
    arbitrateViaEscalationManager: boolean,
    discardOracle: boolean,
    validateDisputers: boolean,
    assertingCaller: string,
    escalationManager: string
  ] & {
    arbitrateViaEscalationManager: boolean;
    discardOracle: boolean;
    validateDisputers: boolean;
    assertingCaller: string;
    escalationManager: string;
  };

  export type AssertionStruct = {
    escalationManagerSettings: OptimisticOracleV3Interface.EscalationManagerSettingsStruct;
    asserter: AddressLike;
    assertionTime: BigNumberish;
    settled: boolean;
    currency: AddressLike;
    expirationTime: BigNumberish;
    settlementResolution: boolean;
    domainId: BytesLike;
    identifier: BytesLike;
    bond: BigNumberish;
    callbackRecipient: AddressLike;
    disputer: AddressLike;
  };

  export type AssertionStructOutput = [
    escalationManagerSettings: OptimisticOracleV3Interface.EscalationManagerSettingsStructOutput,
    asserter: string,
    assertionTime: bigint,
    settled: boolean,
    currency: string,
    expirationTime: bigint,
    settlementResolution: boolean,
    domainId: string,
    identifier: string,
    bond: bigint,
    callbackRecipient: string,
    disputer: string
  ] & {
    escalationManagerSettings: OptimisticOracleV3Interface.EscalationManagerSettingsStructOutput;
    asserter: string;
    assertionTime: bigint;
    settled: boolean;
    currency: string;
    expirationTime: bigint;
    settlementResolution: boolean;
    domainId: string;
    identifier: string;
    bond: bigint;
    callbackRecipient: string;
    disputer: string;
  };
}

export interface OOV3_GettingStartedInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "assertTruth"
      | "assertedClaim"
      | "assertionId"
      | "getAssertion"
      | "getAssertionResult"
      | "settleAndGetAssertionResult"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "assertTruth",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "assertedClaim",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "assertionId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAssertion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAssertionResult",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "settleAndGetAssertionResult",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "assertTruth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assertedClaim",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assertionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssertion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssertionResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleAndGetAssertionResult",
    data: BytesLike
  ): Result;
}

export interface OOV3_GettingStarted extends BaseContract {
  connect(runner?: ContractRunner | null): OOV3_GettingStarted;
  waitForDeployment(): Promise<this>;

  interface: OOV3_GettingStartedInterface;

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

  assertTruth: TypedContractMethod<[], [void], "nonpayable">;

  assertedClaim: TypedContractMethod<[], [string], "view">;

  assertionId: TypedContractMethod<[], [string], "view">;

  getAssertion: TypedContractMethod<
    [],
    [OptimisticOracleV3Interface.AssertionStructOutput],
    "view"
  >;

  getAssertionResult: TypedContractMethod<[], [boolean], "view">;

  settleAndGetAssertionResult: TypedContractMethod<[], [boolean], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "assertTruth"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "assertedClaim"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "assertionId"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getAssertion"
  ): TypedContractMethod<
    [],
    [OptimisticOracleV3Interface.AssertionStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getAssertionResult"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "settleAndGetAssertionResult"
  ): TypedContractMethod<[], [boolean], "nonpayable">;

  filters: {};
}
