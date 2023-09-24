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

export declare namespace PowDoneGoal {
  export type TaskStruct = {
    description: string;
    verificationMethod: BigNumberish;
    verificationMaterial: BytesLike;
    verificationAddress: AddressLike;
    stake: BigNumberish;
    achieved: boolean;
    verified: boolean;
    givenUp: boolean;
    evidence: BytesLike;
    deadline: BigNumberish;
  };

  export type TaskStructOutput = [
    description: string,
    verificationMethod: bigint,
    verificationMaterial: string,
    verificationAddress: string,
    stake: bigint,
    achieved: boolean,
    verified: boolean,
    givenUp: boolean,
    evidence: string,
    deadline: bigint
  ] & {
    description: string;
    verificationMethod: bigint;
    verificationMaterial: string;
    verificationAddress: string;
    stake: bigint;
    achieved: boolean;
    verified: boolean;
    givenUp: boolean;
    evidence: string;
    deadline: bigint;
  };
}

export interface PowDoneGoalInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "assertionId"
      | "depositStake"
      | "distributeStakeAfterDeadline"
      | "getTasks"
      | "giveUp"
      | "markDone"
      | "recoverAddress"
      | "setTask"
      | "stakeTokens"
      | "stakers"
      | "stakersBalances"
      | "tasks"
      | "token"
      | "unstakeTokens"
      | "verify"
      | "withdrawStake"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "TaskAchieved" | "TaskSet" | "TaskVerified"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "assertionId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositStake",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "distributeStakeAfterDeadline",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTasks",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "giveUp",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "markDone",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverAddress",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setTask",
    values: [
      string,
      BigNumberish,
      BytesLike,
      AddressLike,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakersBalances",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tasks",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unstakeTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawStake",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "assertionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "distributeStakeAfterDeadline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTasks", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "giveUp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "markDone", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "recoverAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setTask", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakeTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakersBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tasks", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unstakeTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawStake",
    data: BytesLike
  ): Result;
}

export namespace TaskAchievedEvent {
  export type InputTuple = [user: AddressLike, taskIndex: BigNumberish];
  export type OutputTuple = [user: string, taskIndex: bigint];
  export interface OutputObject {
    user: string;
    taskIndex: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TaskSetEvent {
  export type InputTuple = [
    user: AddressLike,
    description: string,
    verificationMethod: BigNumberish,
    verificationMaterial: BytesLike,
    burntPKPAddress: AddressLike,
    stake: BigNumberish,
    deadline: BigNumberish
  ];
  export type OutputTuple = [
    user: string,
    description: string,
    verificationMethod: bigint,
    verificationMaterial: string,
    burntPKPAddress: string,
    stake: bigint,
    deadline: bigint
  ];
  export interface OutputObject {
    user: string;
    description: string;
    verificationMethod: bigint;
    verificationMaterial: string;
    burntPKPAddress: string;
    stake: bigint;
    deadline: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TaskVerifiedEvent {
  export type InputTuple = [user: AddressLike, success: boolean];
  export type OutputTuple = [user: string, success: boolean];
  export interface OutputObject {
    user: string;
    success: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PowDoneGoal extends BaseContract {
  connect(runner?: ContractRunner | null): PowDoneGoal;
  waitForDeployment(): Promise<this>;

  interface: PowDoneGoalInterface;

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

  assertionId: TypedContractMethod<[], [string], "view">;

  depositStake: TypedContractMethod<
    [amount: BigNumberish, taskIndex: BigNumberish],
    [void],
    "nonpayable"
  >;

  distributeStakeAfterDeadline: TypedContractMethod<
    [taskIndex: BigNumberish],
    [void],
    "nonpayable"
  >;

  getTasks: TypedContractMethod<
    [user: AddressLike],
    [PowDoneGoal.TaskStructOutput[]],
    "view"
  >;

  giveUp: TypedContractMethod<[taskIndex: BigNumberish], [void], "nonpayable">;

  markDone: TypedContractMethod<
    [taskIndex: BigNumberish, _evidence: BytesLike],
    [void],
    "nonpayable"
  >;

  recoverAddress: TypedContractMethod<
    [_hash: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;

  setTask: TypedContractMethod<
    [
      _description: string,
      _verificationMethod: BigNumberish,
      _verificationMaterial: BytesLike,
      _verificationAddress: AddressLike,
      _stake: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  stakeTokens: TypedContractMethod<
    [_amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  stakers: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  stakersBalances: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  tasks: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [
        string,
        bigint,
        string,
        string,
        bigint,
        boolean,
        boolean,
        boolean,
        string,
        bigint
      ] & {
        description: string;
        verificationMethod: bigint;
        verificationMaterial: string;
        verificationAddress: string;
        stake: bigint;
        achieved: boolean;
        verified: boolean;
        givenUp: boolean;
        evidence: string;
        deadline: bigint;
      }
    ],
    "view"
  >;

  token: TypedContractMethod<[], [string], "view">;

  unstakeTokens: TypedContractMethod<
    [_amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  verify: TypedContractMethod<
    [taskIndex: BigNumberish, user: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawStake: TypedContractMethod<
    [amount: BigNumberish, taskIndex: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "assertionId"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "depositStake"
  ): TypedContractMethod<
    [amount: BigNumberish, taskIndex: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "distributeStakeAfterDeadline"
  ): TypedContractMethod<[taskIndex: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getTasks"
  ): TypedContractMethod<
    [user: AddressLike],
    [PowDoneGoal.TaskStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "giveUp"
  ): TypedContractMethod<[taskIndex: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "markDone"
  ): TypedContractMethod<
    [taskIndex: BigNumberish, _evidence: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "recoverAddress"
  ): TypedContractMethod<
    [_hash: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "setTask"
  ): TypedContractMethod<
    [
      _description: string,
      _verificationMethod: BigNumberish,
      _verificationMaterial: BytesLike,
      _verificationAddress: AddressLike,
      _stake: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "stakeTokens"
  ): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stakers"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "stakersBalances"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "tasks"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [
        string,
        bigint,
        string,
        string,
        bigint,
        boolean,
        boolean,
        boolean,
        string,
        bigint
      ] & {
        description: string;
        verificationMethod: bigint;
        verificationMaterial: string;
        verificationAddress: string;
        stake: bigint;
        achieved: boolean;
        verified: boolean;
        givenUp: boolean;
        evidence: string;
        deadline: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "unstakeTokens"
  ): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verify"
  ): TypedContractMethod<
    [taskIndex: BigNumberish, user: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawStake"
  ): TypedContractMethod<
    [amount: BigNumberish, taskIndex: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "TaskAchieved"
  ): TypedContractEvent<
    TaskAchievedEvent.InputTuple,
    TaskAchievedEvent.OutputTuple,
    TaskAchievedEvent.OutputObject
  >;
  getEvent(
    key: "TaskSet"
  ): TypedContractEvent<
    TaskSetEvent.InputTuple,
    TaskSetEvent.OutputTuple,
    TaskSetEvent.OutputObject
  >;
  getEvent(
    key: "TaskVerified"
  ): TypedContractEvent<
    TaskVerifiedEvent.InputTuple,
    TaskVerifiedEvent.OutputTuple,
    TaskVerifiedEvent.OutputObject
  >;

  filters: {
    "TaskAchieved(address,uint256)": TypedContractEvent<
      TaskAchievedEvent.InputTuple,
      TaskAchievedEvent.OutputTuple,
      TaskAchievedEvent.OutputObject
    >;
    TaskAchieved: TypedContractEvent<
      TaskAchievedEvent.InputTuple,
      TaskAchievedEvent.OutputTuple,
      TaskAchievedEvent.OutputObject
    >;

    "TaskSet(address,string,uint8,bytes,address,uint256,uint256)": TypedContractEvent<
      TaskSetEvent.InputTuple,
      TaskSetEvent.OutputTuple,
      TaskSetEvent.OutputObject
    >;
    TaskSet: TypedContractEvent<
      TaskSetEvent.InputTuple,
      TaskSetEvent.OutputTuple,
      TaskSetEvent.OutputObject
    >;

    "TaskVerified(address,bool)": TypedContractEvent<
      TaskVerifiedEvent.InputTuple,
      TaskVerifiedEvent.OutputTuple,
      TaskVerifiedEvent.OutputObject
    >;
    TaskVerified: TypedContractEvent<
      TaskVerifiedEvent.InputTuple,
      TaskVerifiedEvent.OutputTuple,
      TaskVerifiedEvent.OutputObject
    >;
  };
}