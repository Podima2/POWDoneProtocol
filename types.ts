import fs from "fs";
import { runTypeChain } from "typechain";

const DIR = "./scaffold-eth-2/packages/hardhat/deployments/localhost";
const OUT = './src/contracts';
const TARGET = "ethers-v6";

let filePaths: any = [];

fs.readdirSync(DIR).forEach((path) => {
  if (!path.includes('.json')) {
    return;
  }
  filePaths.push(`${DIR}/${path}`);
});

let success = 0;

for (let i = 0; i < filePaths.length; i++) {
  const file = Bun.file(filePaths[i]);
  let fileName = ((file.name?.match(/[^/]*$/)) as any)[0];
  console.log("fileName", fileName)
  await Bun.write(`${OUT}/${fileName}`, file)

  try {
    await runTypeChain({
      cwd: process.cwd(),
      filesToProcess: [`${OUT}/${fileName}`],
      allFiles: [`${OUT}/${fileName}`],
      outDir: OUT,
      target: TARGET,
    })
    success += 1;
  } catch (e) {
    console.log("error", e)
  }
}

if (success === filePaths.length) {
  console.log("All contracts have been typed")
} else {
  console.log("Some contracts have not been typed");
}

const OTHER_JSON = [
  './src/contracts/lit-contracts/PKPNFT.json',
  './src/contracts/lit-contracts/PKPHelper.json',
  './src/contracts/lit-contracts/PKPPermissions.json',
]

for (let i = 0; i < OTHER_JSON.length; i++) {
  const file = Bun.file(OTHER_JSON[i]);
  let fileName = ((file.name?.match(/[^/]*$/)) as any)[0];
  console.log("fileName", fileName)
  await Bun.write(`${OUT}/${fileName}`, file)

  try {
    await runTypeChain({
      cwd: process.cwd(),
      filesToProcess: [`${OUT}/${fileName}`],
      allFiles: [`${OUT}/${fileName}`],
      outDir: OUT,
      target: TARGET,
    })
    success += 1;
  } catch (e) {
    console.log("error", e)

  }
}