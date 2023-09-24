import { SDK, Auth, TEMPLATES } from '@infura/sdk';
import IPFS from '@infura/sdk/dist/src/services/ipfsService';

// @ts-ignore
import { Web3Storage } from 'web3.storage'

export const createStorageClient = () => {

  const pinningClient = new IPFS({
    projectId: process.env.INFURA_KEY,
    apiKeySecret: process.env.INFURA_SECRET_KEY,
  });

  const storageClient = new Web3Storage({ token: process.env.WEB3_STORAGE_KEY });

  // upload
  async function upload(data: any) {
    const res = await pinningClient.uploadContent({ source: data })
    return res.split('//')[1];
  }

  async function uploadFiles(files: any) {

    // const buffer = Buffer.from(JSON.stringify({ "test": "test" }))
    // const files = [new File([buffer], 'string.txt')]

    return await storageClient.put(files)
  }

  return {
    pinningClient,
    storageClient,
    upload,
    uploadFiles
  }
}

// const storageClient = createStorageClient();
// const res = await storageClient.uploadFiles([
//   new File([new Uint8Array([1, 2, 3])], 'hello.txt'),
// ]);
// console.log("res", res)