import { LitContracts } from '@lit-protocol/contracts-sdk';

export function convertIPFSHashToHex(ipfsHash: string) {
  return (new LitContracts()).utils.getBytesFromMultihash(ipfsHash);
}

export function convertHexToIPFSHash(hex: string) {
  return (new LitContracts()).utils.getMultihashFromBytes(hex);
}

// test
// bun ./src/helpers/lit-helper/lit-utils.ts
// const ipfsHex = convertIPFSHashToHex("QmZ3Gtto1fqiGXvrBLjTtjTh3s9zeFY2NjCj4ytaVYJpsr");
// console.log("ipfsHex", ipfsHex);