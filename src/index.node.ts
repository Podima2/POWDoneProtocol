// *** This package is for Node.js and doesn't run on the browser ***

import {
  createLitClient,
  createLitAction,
  permitPKPToUseLitAction,
  PKPNFTJSON,
  uploadLitAction,
} from './helpers/lit-helper/lit-helper';
import {
  convertIPFSHashToHex,
  convertHexToIPFSHash
} from "./helpers/lit-helper/lit-utils";
import {
  createStorageClient
} from './helpers/storage-helper';
import {
  createGoalContract,
  createTokenContract,
  initGOALTokenState,
  getFundsFromFaucet,
  PowDoneContracts,
  setTask,
  getTasks
} from './helpers/contracts-helper';

import {
  createWallet
} from './helpers/wallet-helper';


export {
  // *** Lit helper exports ***
  createLitAction,
  createLitClient,
  permitPKPToUseLitAction,
  PKPNFTJSON,
  uploadLitAction,

  // *** Lit utils exports ***
  convertHexToIPFSHash,
  convertIPFSHashToHex,

  // *** Storage helper exports ***
  createStorageClient,

  // *** Contracts helper exports ***
  createGoalContract,
  createTokenContract,
  getFundsFromFaucet,
  getTasks,
  initGOALTokenState,
  PowDoneContracts,
  setTask,

  // *** Wallet helper exports ***
  createWallet,
}