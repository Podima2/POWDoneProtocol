// Publish to the Scroll Network
import { createGoalContract, getFundsFromFaucet, initGOALTokenState } from "./helpers/contracts-helper";
import { createWallet } from './helpers/wallet-helper';
import { permitPKPToUseLitAction, createAuthSig, createLitClient } from './helpers/lit-helper/lit-helper';
import { createStorageClient } from './helpers/storage-helper';
import { convertIPFSHashToHex, convertHexToIPFSHash } from "./helpers/lit-helper/lit-utils";
import { ethers } from "ethers";

const action = process.argv.slice(2)[0];

console.log("Running action:", action);

// If the argument is 'init'
if (action === 'init') {
  const wallet = createWallet();
  await getFundsFromFaucet(wallet.address);
  await getFundsFromFaucet(process.env.PUBKEY2 as unknown as string);
  await initGOALTokenState(wallet);
}

if (action === 'fund') {

  const address = (process.argv.slice(2) as any)[1];
  const wallet = createWallet();
  // await getFundsFromFaucet(address);
  await initGOALTokenState(wallet, address);
}

// As a user
if (action === 'set-task') {
  const wallet = createWallet();
  const goalContract = createGoalContract(wallet);

  // Input parameters
  const description = getArgValue('description', "Description Text");
  const verificationMethod = getArgValue('verificationMethod', 0);
  const stake = getArgValue('stake', 100000); // Needs to be checked

  // Verification methods
  // 0 = LitAction
  // 1 = UMA
  // 2 = Supervisor
  // 3 = Blockchain

  // When the user chooses LitAction as a verification method to be used for their task
  // For example, I know that you also run a grant program, so let's say when GitHub commits is more than 10 (which could be used to monitor Grant), you can also link each commit to an AI model that checks if the requirements or milestones of the code are being met.
  // The code MUST be public on the UI that the user is committed to.
  if (verificationMethod === 0) {
    let conditionCode = `// 2
    (async () => {
      // const isPermittedAction = await Lit.Actions.isPermittedAction({ tokenId, ipfsId })
      // console.log("isPermittedAction:", isPermittedAction);
      
      const counterRes = await fetch('https://api2.powdone.com/counter');
      const counter = (await counterRes.json()).counter;
      
      // COMMITTED CONDITION, CAN'T BE CHANGED AFTER
      if(counter >= 5){
        console.log("YOU ARE VERIFIED!!");
        const sigShare = await LitActions.signEcdsa({
          toSign, // signing the IPFS hash
          publicKey, // public key of PKP
          sigName: "sig1",
        });
      }else{
        throw new Error("Try harder next time!");
      }
    })();`;

    // Upload to IPFS
    const storageClient = createStorageClient();
    const ipfsId = await storageClient.upload(conditionCode);
    const ipfsHex = convertIPFSHashToHex(ipfsId);
    console.log("ipfsHex:", ipfsHex)

    const ipfsHash = ethers.getBytes(ethers.id(ipfsHex));
    const messageHash = ethers.hexlify(ipfsHash);
    console.log("⭐️ messageHash", messageHash);

    // Mint, grant, burn
    const mintGrantBurn = await permitPKPToUseLitAction(wallet, ipfsId);
    console.log("mintGrantBurn", mintGrantBurn);

    const burntPKPAddress = mintGrantBurn.pkp.ethAddress;

    const tx = await goalContract.setTask(
      description,
      verificationMethod, // eg. LitAction, UMA, Supervisor, Blockchain
      messageHash, // ipfsId in hash | verificationMaterial
      burntPKPAddress,
      stake,
      30,
    );
    await tx.wait();

    console.log("Task set!");
    console.log("You will need this to mark the task as achieved:");
    console.log("- ipfsId", ipfsId);
    console.log("- tokenId", mintGrantBurn.pkp.tokenId);
    console.log('- publicKey', mintGrantBurn.pkp.pubKey);

    console.log("pkp:")
    console.log("- burntPKPAddress", burntPKPAddress);
  } else if (verificationMethod === 1) {
    // UMA
    const tx = await goalContract.setTask(
      description,
      verificationMethod, // eg. LitAction, UMA, Supervisor, Blockchain
      "", // VerificationMaterial
      "", // VerificationAddress
      stake,
      20,
    )
    await tx.wait();
  }

  // const receipt = await res.wait();
  // console.log("receipt", receipt);
}

if (action === 'done') {
  const wallet = createWallet();
  const litClient = await createLitClient();
  const authSig = await createAuthSig(wallet);
  const goalContract = createGoalContract(wallet);

  const taskIndex = getArgValue('taskIndex', 0);

  console.log("Getting signature from lit protocol...");

  // GETTING THIS BACK FROM SMART CONTRACT
  const ipfsId = "QmU3ioRSFauRLay9BuGEv1U7gYjqRXSFhFYJuvtX2ey2Aw";
  const pkpPublicKey = "0x0429c8bdb05a9909c2eca19d58a309d1e946a7b7d8dcb59147686c0112095a9c50cd7bfb2a75288d98724778e24077e3b5ffeb48f5cc7ed72460149f9781267bdb";

  // bytes34
  const ipfsHex = convertIPFSHashToHex(ipfsId);

  // Get bytes size
  console.log("ipfsHex.length", ipfsHex.length);

  const messageHash = ethers.getBytes(ethers.id(ipfsHex));
  console.log("messageHash", messageHash);
  console.log("messageHash.length", messageHash.length);

  // MessageHash in hex
  console.log("⭐️ messageHash in hex", ethers.hexlify(messageHash));

  // Anyone can use the burnt PKP to sign the messageHash
  const res = await litClient.executeJs({
    authSig, // Fulfill the requirements for executeJs and lit nodes
    ipfsId: ipfsId,
    jsParams: {
      toSign: messageHash,
      publicKey: pkpPublicKey,
    },
  });

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

  const recoveredAddress = ethers.recoverAddress(messageHash, signature);
  console.log("signature.length:", signature.length);
  console.log("recoveredAddress:", recoveredAddress);

  console.log("taskIndex:", taskIndex);
  console.log("signature:", signature);

  try {
    const tx = await goalContract.markDone(
      taskIndex,
      signature // Evidence
    );
    await tx.wait();
  } catch (e) {
    console.log("e", e);
  }

  console.log("Marked Achieved!", taskIndex);
}

if (action === 'verify') {
  const wallet = createWallet();
  // const litClient = await createLitClient();
  // const authSig = await createAuthSig(wallet);
  const goalContract = createGoalContract(wallet);

  // Input parameters
  const taskIndex = getArgValue('taskIndex', 0);

  // Verify on chain
  const verifyTx = await goalContract.verify(taskIndex, wallet.address);
  await verifyTx.wait();

  // console.log("verifyTx", verifyTx);
}

if (action === 'mintgrantburn') {
  const wallet = createWallet();
  const storageClient = createStorageClient();
  const litClient = await createLitClient();

  // Deterministically generate a hash
  // We have to check the signature returned by the burnt PKP to verify the 
  // original hash message (IPFS hash) is the same as the one we have
  
  let code = `(async () => {
  const isPermittedAction = await Lit.Actions.isPermittedAction({ tokenId, ipfsId })
  console.log("isPermittedAction:", isPermittedAction);

  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName: "sig1",
  });
})();`;

  // Main
  const authSig = await createAuthSig(wallet);
  console.log("authSig", authSig);
  const ipfsId = await storageClient.upload(code);
  console.log("ipfsId or verification method", ipfsId);

  // process.exit(0);

  // Mint, grant, burn
  const mintGrantBurn = await permitPKPToUseLitAction(wallet, ipfsId);

  console.log("mintGrantBurn", mintGrantBurn);

  const res = await litClient.executeJs({
    authSig,
    ipfsId,
    jsParams: {
      tokenId: mintGrantBurn.pkp.tokenId,
      ipfsId,
      publicKey: mintGrantBurn.pkp.pubKey,
      toSign: ipfsId,
      authSig,
    }
  });

  console.log("res", res);
}

function getArgValue(argKey: string, defaultValue: any) {
  const args = process.argv.slice(2);
  let value = defaultValue;
  args.forEach(arg => {
    if (arg.startsWith(`--${argKey}`)) {
      const splitArg = arg.split('=');
      if (splitArg.length > 1) {
        value = splitArg[1];
      }
    }
  });
  return value;
}
console.log("Completed action:", action);