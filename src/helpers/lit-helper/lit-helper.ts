import { LitNodeClientNodeJs } from '@lit-protocol/lit-node-client-nodejs';
import { ethers } from 'ethers';
import siwe from 'lit-siwe';
import { PKPNFT } from '../../contracts/PKPNFT';
import PKPNFTJson from '../../contracts/PKPNFT.json';
import { convertIPFSHashToHex } from './lit-utils';

export const PKPNFTJSON = PKPNFTJson;

export const createLitAction = ({
  api = 'https://api2.powdone.com/counter',
  accessValue = '.counter',
  condition = '>=',
  expectedValue = 5,
}) => {

  console.log("filling variables to lit action template");

  return `
  async go(){
    const res = await fetch('${api}');
    const data = (await res.json())${accessValue}};
    
    // COMMITED CONDITION, CAN'T BE CHANGED AFTER
    if(data ${condition} ${expectedValue}){
      console.log("YOU ARE VERIFIED!!");
      const sigShare = await LitActions.signEcdsa({
        toSign, // signing the IPFS hash
        publicKey, // public key of PKP
        sigName: "sig1",
      });
    }else{
      throw new Error("Try harder next time!");
    }
  }
  go();`
}

export const uploadLitAction = async (data: any) => {

  console.log("uploading lit action to ipfs")

  const ipfsRequest = await fetch('https://api2.powdone.com/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });
  const { uploadRes } = await ipfsRequest.json();

  const ipfsId = uploadRes;

  const hex = convertIPFSHashToHex(ipfsId);

  const hash = ethers.getBytes(ethers.id(hex));

  return {
    ipfsId,
    ipfsHex: hex,
    ipfsHash: hash,
    url: 'https://ipfs.io/ipfs/' + ipfsId,
  };
}

export async function createLitClient() {
  const client = new LitNodeClientNodeJs({ litNetwork: process.env.LIT_NETWORK ?? 'serrano', debug: false, });;
  await client.connect();
  return client;
}

export async function createPKPNFTContract(wallet: ethers.Wallet) {
  return new ethers.Contract(
    PKPNFTJson.address,
    PKPNFTJson.abi,
    wallet
  ) as any as PKPNFT;
}

export async function createAuthSig(wallet: ethers.Wallet) {

  const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
  console.log("expirationTime:", expirationTime)

  const siweMessage = new siwe.SiweMessage({
    domain: 'localhost',
    address: wallet.address,
    // statement: 'Proof of work done protocol',
    statement: "I am signing this statement for Your App's URI or Identifier",
    uri: 'http://localhost/login',
    version: "1",
    chainId: 1,
    expirationTime,
  });

  const signedMessage = siweMessage.prepareMessage();

  const signature = await wallet.signMessage(signedMessage);

  const address = ethers.verifyMessage(signedMessage, signature);

  return {
    sig: signature,
    derivedVia: 'web3.eth.personal.sign',
    signedMessage,
    address,
  }
}

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
    console.log("error when getting gas limit, use default gas limit");
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
  console.log("lit helper ****** receipt", receipt);

  console.log("completed contract method: ", method)

  return {
    populateTransaction: txRequest,
    estimateGas: gasLimit,
    receipt,
  }
}

export async function permitPKPToUseLitAction(wallet: ethers.Wallet, ipfsHash: string) {

  console.log(`starting mint grant burn process for ipfsHash: "${ipfsHash}"`);
  const hexHash = convertIPFSHashToHex(ipfsHash);
  const pkpNFTContract = await createPKPNFTContract(wallet);

  const mintCost = await pkpNFTContract.mintCost();
  console.log("mintCost:", mintCost);

  let _receipt;

  // if pkp wallet
  if (wallet.hasOwnProperty('litNodeClientReady')) {

    // @ts-ignore
    const { receipt } = await pkpRunContractMethod(wallet, pkpNFTContract, 'mintGrantAndBurnNext', [
      2,
      hexHash,
      {
        value: mintCost,
      }
    ]);

    _receipt = receipt
  }

  if (!_receipt) {
    throw new Error('Error minting grant burning');
  }

  const logs = _receipt.logs;
  const tokenId = BigInt(logs[3].topics[3]).toString();
  const pubKey = await pkpNFTContract.getPubkey(tokenId);
  const ethAddress = ethers.computeAddress(pubKey);

  const result = {
    message: `permitted ${ipfsHash} to use pkp ${pubKey} to sign`,
    pkp: {
      tokenId,
      pubKey,
      ethAddress,
    },
    ipfsHash,
    ipfsUrl: 'https://ipfs.io/ipfs/' + ipfsHash,
  };

  console.log("mintGrantBurn result:", result);

  return result;
}