import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import { ethers } from "ethers";
import { arrayify, keccak256, resolveProperties } from "ethers/lib/utils";
import { serialize } from '@ethersproject/transactions';

export class PowDoneWallet extends PKPEthersWallet {
  provider: ethers.providers.JsonRpcProvider;

  constructor(args?: any) {
    super({ ...args });
    this.provider = this.rpcProvider;
  }

  async init() {
    console.log("initting...");
    await super.init();
  }

  async signTransaction(transaction: any): Promise<string> {
    if (!this.litNodeClientReady) {
      await this.init();
    }
    const addr = await this.getAddress();
    this.log('signTransaction => addr:', addr);

    try {
      if (!transaction['gasLimit']) {
        transaction.gasLimit = await this.rpcProvider.estimateGas(transaction);
        this.log('signTransaction => gasLimit:', transaction.gasLimit);
      }

      if (!transaction['nonce']) {
        transaction.nonce = await this.rpcProvider.getTransactionCount(addr);
        this.log('signTransaction => nonce:', transaction.nonce);
      }

      if (!transaction['chainId']) {
        transaction.chainId = (await this.rpcProvider.getNetwork()).chainId;
        this.log('signTransaction => chainId:', transaction.chainId);
      }

      if (!transaction['gasPrice']) {
        transaction.gasPrice = await this.getGasPrice();
        this.log('signTransaction => gasPrice:', transaction.gasPrice);
      }
    } catch (err) {
      this.log(
        'signTransaction => unable to populate transaction with details:',
        err
      );
    }

    // @ts-ignore
    return resolveProperties(transaction).then(async (tx: any) => {
      if (tx.from != null) {
        if (await this.getAddress() !== this.address) {
          throw new Error('transaction from address mismatch. transaction.from ', transaction.from);
        }
        delete tx.from;
      }

      const serializedTx = serialize(tx);
      const unsignedTxn = keccak256(serializedTx);

      const toSign = arrayify(unsignedTxn);
      const signature = (await this.runSign(toSign)).signature;

      return serialize(tx, signature);
    });
  }

  async call(transaction: any, blockTag: any): Promise<string> {
    const network = await this.rpcProvider.getNetwork();

    const resolved = await resolveProperties({
      transaction: this.provider._getTransactionRequest(transaction),
      blockTag: this.provider._getBlockTag(blockTag),
      ccipReadEnabled: Promise.resolve(transaction.ccipReadEnabled)
    });

    // @ts-ignore
    return this.rpcProvider._call(resolved.transaction, resolved.blockTag, resolved.ccipReadEnabled);
  }
  getChainId() {
    return this.throwError(`getChainId Not available in PKPEthersWallet`);
  }
  getGasPrice() {
    return this.rpcProvider.getGasPrice();
  }
  getFeeData() {
    return this.rpcProvider.getFeeData();
  }
  resolveName(name: any) {
    return this.throwError(`resolveName Not available in PKPEthersWallet`);
  }
  checkTransaction(transaction: any) {
    return this.throwError(`checkTransaction Not available in PKPEthersWallet`);
  }
  populateTransaction(transaction: any) {
    return this.throwError(`populateTransaction Not available in PKPEthersWallet`);
  }
  _checkProvider(operation: any) {
    return this.throwError(`_checkProvider Not available in PKPEthersWallet`);
  }

}
