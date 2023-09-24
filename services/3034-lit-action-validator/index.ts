import { ethers } from 'ethers';
import { TaskAchievedEvent, TaskSetEvent, TaskVerifiedEvent } from '../../src/contracts/PowDoneGoal';
import { createGoalContract } from '../../src/helpers/contracts-helper';
import { createWallet } from '../../src/helpers/wallet-helper';
console.log("Verification Service Started");

// types
const VerificationMethod = ["LitAction", "UMA", "Supervisor", "Blockchain"]

// libs
const wallet = createWallet();
const goalContract = createGoalContract(wallet);

goalContract.on(goalContract.getEvent('TaskSet'), (
  user,
  description,
  verificationMethod,
  verificationMaterial,
  verificationAddress,
  stake,
  deadline,
  e
) => {

  const verifyMethod = VerificationMethod[parseInt(verificationMethod.toString())];

  console.log("🚨 Someone set a task!");
  console.log("User:", user);
  console.log(`verificationMethod: ${verificationMethod} | ${verifyMethod}`);
  console.log("verificationMaterial:", verificationMaterial);
  console.log("verificationAddress:", verificationAddress);
  console.log("Description:", description);
  console.log("Stake:", stake);
});


goalContract.on(goalContract.getEvent('TaskAchieved'), (user, taskIndex) => {

  const e: TaskAchievedEvent.OutputObject = {
    user,
    taskIndex: parseInt(taskIndex) as any
  }

  console.log("🚨 Someone achieved a task!");
  console.log("User:", e.user);
  console.log("Task Index:", e.taskIndex);
});

goalContract.on(goalContract.getEvent('TaskVerified'), (user, success) => {

  const e: TaskVerifiedEvent.OutputObject = {
    user,
    success,
  }

  console.log("🚨 Someone verified a task!");
  console.log("User:", e.user);
  console.log("Success:", e.success);

})