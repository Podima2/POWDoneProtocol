<h1 align="center">
  <br>
  <img src="">
  <br>
  B2B2C POWDoneProtocol
  <br>
</h1>

<h4 align="center">⚡️ Goal tracker with Versatile verification methods 💥</h4>

<p align="center">
  <a href="https://twitter.com/The_Game_2030">
    <img src="https://img.shields.io/badge/Reach_Agustin-On_Twitter-Green">
  </a>
</p>

![](https://raw.githubusercontent.com/Podima2/POWDoneProtocol/master/1.png)
![](https://raw.githubusercontent.com/Podima2/POWDoneProtocol/master/2.png)

# Demo

- https://powdone.com/ 
  
  B2C Consumer app product built using this SDK, with authentication mechanisms empowered by the Lit Protocol.

- https://counter-app.powdone.com/ 
  
  "Proof of Work" app - a demo use case where the user must press the ADD button at least 5 times for Lit Action to use the PKP to sign.

- https://api2.powdone.com/counter

  The aforementioned demo will update the counter for this API to ensure it meets the predetermined conditions on Lit Action and signs with PKP.

# SDK

- entry points:
  - [nodejs](https://github.com/Podima2/POWDoneProtocol/blob/master/src/index.node.ts)
  - [browser](https://github.com/Podima2/POWDoneProtocol/blob/master/src/index.browser.ts)
- [POWD Contracts Helper](https://github.com/Podima2/POWDoneProtocol/blob/master/src/helpers/contracts-helper.ts
)

# Submitting for

## 1. Lit Protocol
- [Lit Helper](https://github.com/Podima2/POWDoneProtocol/blob/master/src/helpers/lit-helper/lit-helper.ts)

  - PKP Ethers Wallet Fixes:
    - [x] [Added call method to pkp ethers wallet to execute contract calls through pkps](https://github.com/Podima2/POWDoneProtocol/blob/fe8ac61e519dafad6776d9430a03225be6915fb2/services/3030-app/components/PowDoneWallet.tsx#L72)
    - [x] [Utility to populate tx when using pkp to call contract methods.](https://github.com/Podima2/POWDoneProtocol/blob/fe8ac61e519dafad6776d9430a03225be6915fb2/src/helpers/lit-helper/lit-helper.ts#L110) usage in [mintgrantburn](https://github.com/Podima2/POWDoneProtocol/blob/fe8ac61e519dafad6776d9430a03225be6915fb2/src/helpers/lit-helper/lit-helper.ts#L167)
  - Tests
    - Browser
      - [x] [setTask flow](https://github.com/Podima2/POWDoneProtocol/blob/fe8ac61e519dafad6776d9430a03225be6915fb2/services/3030-app/app/page.tsx#L1074)
      - [x] [fetchTasks flow](https://github.com/Podima2/POWDoneProtocol/blob/fe8ac61e519dafad6776d9430a03225be6915fb2/services/3030-app/app/page.tsx#L369)
      - [x] [markDone flow](https://github.com/Podima2/POWDoneProtocol/blob/fe8ac61e519dafad6776d9430a03225be6915fb2/services/3030-app/app/page.tsx#L453-L460) (unable to test)
      - [] verify
    - [Node.js test script](https://github.com/Podima2/POWDoneProtocol/blob/master/src/actions.ts)
      - [x] setTask tested
      - [x] fetchTasks tested
      - [x] markDone tested 
      - [x] verify signature against stored ipfs hash tested
## 2. UMA
  - [usage 1](https://github.com/Podima2/POWDoneProtocol/blob/3d6a4b02871f2af626569e137c5b3cf94b33ff00/services/3033-smart-contracts/packages/hardhat/contracts/PowDoneGoal.sol#L168)
  - [usage 2](https://github.com/Podima2/POWDoneProtocol/blob/3d6a4b02871f2af626569e137c5b3cf94b33ff00/services/3033-smart-contracts/packages/hardhat/contracts/PowDoneGoal.sol#L251)
## 3. Scroll
  - https://sepolia.scrollscan.dev/address/0x1006b674614323ed2fa09b4e862Bc9d81Ecd6284
  - https://sepolia.scrollscan.dev/address/0x6e6ac38BBbaBcD4652790D0Dd9f370412D1b364E
## 4. Arbitrium
  - https://stylus-testnet-explorer.arbitrum.io/address/0x5ADC67C7c11fDed1776A13785a75f4e70bCC1349
  - https://stylus-testnet-explorer.arbitrum.io/address/0xA461fec87594b02cA215BF4988E261b7B4de1a45
## 5. Filecoin 
  - [Web3Storage](https://github.com/Podima2/POWDoneProtocol/blob/30547697cbefc8d64a52d7f92a5878bc847a3d93/src/helpers/storage-helper.ts#L14)
     
---

# Smart contracts

- [PowDoneGoal](https://github.com/Podima2/POWDoneProtocol/blob/master/services/3033-smart-contracts/packages/hardhat/contracts/PowDoneGoal.sol)

- [PowDoneToken](https://github.com/Podima2/POWDoneProtocol/blob/master/services/3033-smart-contracts/packages/hardhat/contracts/PowDoneToken.sol)


<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#Short Description">Short Description</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#Inspirations">Inspirations</a> •
</p>


## Key Features

* User/Company sets Goal and Deadline, USP is the versatile verification methods available
    - Lit Action for universal verification access, approved supervisor(s) and Oracle for on-chain data verification
* Account abstraction, user creates Eth Wallet using gmail authentication (No web3 wallet pre-requisite)
* PKP minting and burning, work-done is linked to PKP
* Random reward schedule for work-done (Best performing psychological algorithm for continued usage) 

## Short Description

POWDone is designed to be a protocol for all habit tracking applications, the idea is to encompass current solutions and provide enhanced flexibility for verification solutions. This is because different goals require different verification methods. Private goals where users do not wish to disclose activities to supervisors can be checked on-chain, goals that could be adopted by companies for stakeholder  by utilising LIT Protocol to 

## How To Use


## FAQs

1) Why Lit protocol?
2) What are examples of private goals, public goals and company/organisation goals?
3) 


## Inspirations



---

> GitHub [@Podima2](https://github.com/Podima2) &nbsp;&middot;&nbsp;
> Twitter [@The_Game_2030](https://twitter.com/The_Game_2030)

# Contracts

## Scroll

### PowDoneToken 
- 0x1006b674614323ed2fa09b4e862Bc9d81Ecd6284
- https://sepolia.scrollscan.dev/address/0x1006b674614323ed2fa09b4e862Bc9d81Ecd6284
- TX: 0xa208287b93a6e6b65b04445c49997709b2db006b822c6f88dcf48ac0408aab35

### PowDoneGoal
- 0x6e6ac38BBbaBcD4652790D0Dd9f370412D1b364E
- https://sepolia.scrollscan.dev/address/0x6e6ac38BBbaBcD4652790D0Dd9f370412D1b364E
- TX: 0xf7ac2daf6fe863c558722b42b11da15e9efda6755245c1d53ebd0d1a893b014f

## Arbitrum Stylus Testnet

### PowDoneToken: 
- 0x5ADC67C7c11fDed1776A13785a75f4e70bCC1349
- https://stylus-testnet-explorer.arbitrum.io/address/0x5ADC67C7c11fDed1776A13785a75f4e70bCC1349
- TX: 0x94c7c27376cfb7f47fa5fe6791d44ff6a345203231adb600335208a5f04c7c91

### PowDoneGoal:
- 0xA461fec87594b02cA215BF4988E261b7B4de1a45
- https://stylus-testnet-explorer.arbitrum.io/address/0xA461fec87594b02cA215BF4988E261b7B4de1a45
- TX: 0x2ffa7f8a0d9fc6a9278bb4b13c49f306c46eb220b05a79986b60d1400caccfdb
