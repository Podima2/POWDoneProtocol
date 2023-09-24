import { ethers } from 'ethers';

export const createWallet = (
  privateKey = process.env.PKEY,
  environment = process.env.ENV ?? 'dev',
  rpcUrl = process.env.LIT_RPC ?? 'http://127.0.0.1:8545/'
) => {

  const rpc = environment === 'dev' ? 'http://127.0.0.1:8545/' : rpcUrl;

  if (!privateKey) {
    throw new Error('No private key provided');
  }

  if (!rpc) {
    throw new Error('No rpc is provided');
  }

  const provider = new ethers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(privateKey, provider);

  return wallet;
}