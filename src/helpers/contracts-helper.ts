import { ethers } from 'ethers';
import { PowDoneGoal } from '../contracts/PowDoneGoal';
import PowDoneGoalJSON from '../contracts/PowDoneGoal.json';
import { PowDoneToken } from '../contracts/PowDoneToken';
import PowDoneTokenJSON from '../contracts/PowDoneToken.json';
import { convertIPFSHashToHex } from '../index.browser';

export async function pkpRunContractMethod(wallet: ethers.Wallet, contract: any, method: string, params: any[]) {
  console.log(`populating contract method: "${method}"`);

  let txRequest = await contract[method].populateTransaction(...params);
  console.log("txRequest:", txRequest);

  console.log(`estimating gas for contract method: "${method}"`);

  let gasLimit;

  try {
    gasLimit = await contract[method].estimateGas(...params, {
      from: wallet.address,
    });
    console.log("gasLimit:", gasLimit);
  } catch (e) {
    console.log("Error when getting gas limit", e);
    gasLimit = 1000000;
  }

  txRequest.gasLimit = gasLimit;

  console.log("pkp wallet signing transaction");
  const tx = await wallet.signTransaction(txRequest);
  console.log("signed tx:", tx);

  console.log("pkp wallet sending transaction");
  // @ts-ignore
  const txResponse = await wallet.sendTransaction(tx);

  const receipt = await txResponse.wait();
  console.log("POWD Contracts Helper ****** receipt", receipt);

  console.log("completed contract method: ", method)

  return {
    populateTransaction: txRequest,
    estimateGas: gasLimit,
    receipt,
  }
}

export const PowDoneContracts = {
  PowDoneGoalJSON,
  PowDoneTokenJSON,
}

export const createGoalContract = (wallet: ethers.Wallet) => new ethers.Contract(
  PowDoneGoalJSON.address,
  PowDoneGoalJSON.abi,
  wallet,
) as any as PowDoneGoal;

export const createTokenContract = (wallet: ethers.Wallet) => new ethers.Contract(
  PowDoneTokenJSON.address,
  PowDoneTokenJSON.abi,
  wallet,
) as any as PowDoneToken;

export const initGOALTokenState = async (
  wallet: ethers.Wallet,
  address?: string,
) => {

  const _address = address ?? wallet.address;

  const goalToken = createTokenContract(wallet);

  // airdrop tokens
  const airdropTx = await goalToken.airdrop([_address], [100000000000000]);
  await airdropTx.wait();

  // check balance
  const balanceOf = await goalToken.balanceOf(_address);
  // set allowance
  const approveTx = await goalToken.increaseAllowance(PowDoneGoalJSON.address, 1000000000000000);
  await approveTx.wait();

  const allowance = await goalToken.allowance(_address, PowDoneGoalJSON.address);

  console.log("Your account is ready to go!");
  console.log("- Airdropped:", ethers.formatEther(balanceOf), "GOAL");
  console.log("- Allowance:", ethers.formatEther(allowance), "GOAL");
}
export const getFundsFromFaucet = async (
  address: string,
  env = process.env.ENV ?? 'dev'
) => {

  const rpc = env === 'dev' ? 'http://127.0.0.1:8545/' : process.env.LIT_RPC;

  const provider = new ethers.JsonRpcProvider(rpc);

  const faucetPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  const faucetWallet = new ethers.Wallet(faucetPrivateKey, provider);

  // check balance
  const balance = await faucetWallet.provider?.getBalance(faucetWallet.address) as any;

  // send funds to wallet
  const faucetTx = await faucetWallet.sendTransaction({
    to: address,
    value: ethers.parseEther("44"),
  });
  await faucetTx.wait();

  console.log("- Faucet Address:", faucetWallet.address);
  console.log("- Faucet balance:", ethers.formatEther(balance), "ETH");
  console.log("- Sent ", ethers.formatEther(faucetTx.value), "ETH to", address);

  return faucetTx;

};
export const setTask = async (wallet: ethers.Wallet, {
  description,
  verificationMethod,
  messageHash,
  burntPKPAddress,
  stake,
  duration,
}: {
  description: string,
  verificationMethod: number,
  messageHash: string,
  burntPKPAddress: string,
  stake: number,
  duration: number,
}) => {

  console.log("calling setTask");

  if (!description || !verificationMethod || !messageHash || !burntPKPAddress || !stake || !duration) {
    throw new Error("Missing required params");
  }

  console.log("description:", description);
  console.log("verificationMethod:", verificationMethod);
  console.log("messageHash:", messageHash);
  console.log("burntPKPAddress:", burntPKPAddress);
  console.log("stake:", stake);
  console.log("duration:", duration);

  const goalContract = createGoalContract(wallet);

  let tx;

  if (wallet.hasOwnProperty('litNodeClientReady')) {

    tx = await pkpRunContractMethod(wallet, goalContract, 'setTask', [
      description,
      verificationMethod, // eg. LitAction, UMA, Supervisor, Blockchain
      messageHash, // ipfsId in hash | verificationMaterial
      burntPKPAddress,
      stake,
      duration,
    ]);
  } else {

    tx = await goalContract.setTask(
      description,
      verificationMethod, // eg. LitAction, UMA, Supervisor, Blockchain
      messageHash, // ipfsId in hash | verificationMaterial
      burntPKPAddress,
      stake,
      duration,
    );

  }
  console.log("tx:", tx);
  return tx;
}

export const markDone = async (
  {
    taskIndex,
    ipfsId,
    litClient,
    wallet,
    pkpPublicKey,
    sessionSigs,
  }: {
    litClient: any,
    wallet: ethers.Wallet,
    pkpPublicKey: string,
    taskIndex: number,
    ipfsId: string,
    sessionSigs: any[],
  }) => {
  console.log("marking task as done");

  const goalContract = createGoalContract(wallet);

  const ipfsHex = convertIPFSHashToHex(ipfsId);

  const ipfsHash = ethers.getBytes(ethers.id(ipfsHex));

  const res = await litClient.executeJs({
    sessionSigs: sessionSigs,
    ipfsId: ipfsId,
    jsParams: {
      toSign: ipfsHash,
      pkpPublicKey: pkpPublicKey,
    },
  })

  const signature = ethers.Signature.from({
    r: '0x' + res.signatures.sig1.r,
    s: '0x' + res.signatures.sig1.s,
    v: res.signatures.sig1.recid + 27, // Ethereum uses 27 or 28 as recovery id
  }).serialized;

  console.log("ipfsHex:", ipfsHex);
  console.log("ethers.id(ipfsHex):", ethers.id(ipfsHex));
  console.log("signature", signature);

  if (typeof signature !== 'string') {
    throw new Error('Signature is not a string');
  }

  if (!signature.startsWith('0x')) {
    throw new Error('Signature does not start with 0x');
  }

  if (signature.length !== 132) {
    throw new Error('Signature is not the correct length');
  }


  const recoveredAddress = ethers.recoverAddress(ipfsHash, signature);
  console.log("signature.length:", signature.length);
  console.log("recoveredAddress:", recoveredAddress);

  console.log("taskIndex:", taskIndex);
  console.log("signature:", signature);

  try {
    const tx = await goalContract.markDone(
      taskIndex,
      signature // evidence
    );
    await tx.wait();

    console.log("Marked Archieved!", taskIndex);

    return tx;
  } catch (e) {
    console.log("e", e);
  }
}

export const getTasks = async (wallet: ethers.Wallet, address: "0xCc4d28dD63Bb58540EeBDD713073Ad1Da1aFd18D") => {
  const goalContracts = createGoalContract(wallet);
  const tasks = await goalContracts.getTasks(address)

  return tasks;
}