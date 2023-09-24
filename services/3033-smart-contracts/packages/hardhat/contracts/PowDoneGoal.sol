pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";
import "@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";

contract PowDoneGoal {
	// UMA
	// Goerli Testnet
	OptimisticOracleV3Interface oov3 =
		OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);

	bytes32 public assertionId;

	mapping(address => uint256) public stakersBalances; // track staked balances
	address[] public stakers; // all stakers

	enum VerificationMethod {
		LitAction, // 0
		UMA, // 1
		Supervisor, // 2
		Blockchain // 3
	}

	struct Task {
		string description; // 0
		VerificationMethod verificationMethod; // 1
		bytes verificationMaterial; // 2 ipfsId for lit action
		address verificationAddress; // 3 bunrt pkp address for lit action
		uint256 stake; // 4
		bool achieved; // 5
		bool verified; // 6
		bool givenUp; // 7
		bytes evidence; // 8 signature for lit action
		uint256 deadline; // 9
	}

	IERC20 public token; // Assuming ERC20 token is used for staking
	mapping(address => Task[]) public tasks; // Changed to an array of tasks
	event TaskSet(
		address indexed user,
		string description,
		VerificationMethod verificationMethod,
		bytes verificationMaterial,
		address burntPKPAddress,
		uint256 stake,
		uint256 deadline
	);
	event TaskAchieved(address indexed user, uint256 taskIndex);
	event TaskVerified(address indexed user, bool success);

	constructor(address _token) {
		token = IERC20(_token);
	}

	function stakeTokens(uint256 _amount) public {
		require(
			token.transferFrom(msg.sender, address(this), _amount),
			"Transfer failed"
		);

		// If user hasn't staked before, add to stakers array
		if (stakersBalances[msg.sender] == 0) {
			stakers.push(msg.sender);
		}

		// Increase the user's stake
		stakersBalances[msg.sender] += _amount;
	}

	function recoverAddress(
		bytes32 _hash,
		bytes memory _signature
	) public pure returns (address) {
		require(_signature.length == 65, "invalid signature length");

		bytes32 r;
		bytes32 s;
		uint8 v;

		assembly {
			r := mload(add(_signature, 0x20))
			s := mload(add(_signature, 0x40))
			v := byte(0, mload(add(_signature, 0x60)))
		}

		// Version of signature should be 27 or 28, but 0 and 1 are also possible versions
		if (v < 27) {
			v += 27;
		}

		require(v == 27 || v == 28, "invalid signature version");

		return ecrecover(_hash, v, r, s);
	}

	function setTask(
		string memory _description,
		VerificationMethod _verificationMethod,
		bytes calldata _verificationMaterial,
		address _verificationAddress,
		uint256 _stake,
		uint256 _duration // duration in seconds from now to set the deadline
	) public {
		require(token.balanceOf(msg.sender) >= _stake, "Insufficient balance");

		token.transferFrom(msg.sender, address(this), _stake);

		// if (_verificationMethod == VerificationMethod.LitAction) {
		// expecting ipfs hash serves as like a contract
		// }
		// else if (_verificationMethod == VerificationMethod.supervisor){
		// 	// expecting address of supervisor
		// 	// we check if a given action's PKP's permitted users is the supervisor
		// }

		uint256 _deadline = block.timestamp + _duration;

		tasks[msg.sender].push(
			Task({
				description: _description,
				verificationMethod: _verificationMethod,
				verificationMaterial: _verificationMaterial,
				verificationAddress: _verificationAddress,
				stake: _stake,
				achieved: false,
				verified: false,
				givenUp: false,
				evidence: "",
				deadline: _deadline
			})
		);

		emit TaskSet(
			msg.sender,
			_description,
			_verificationMethod,
			_verificationMaterial,
			_verificationAddress,
			_stake,
			_deadline
		);
	}

	function markDone(uint256 taskIndex, bytes memory _evidence) public {
		require(taskIndex < tasks[msg.sender].length, "Invalid task index");
		require(
			block.timestamp <= tasks[msg.sender][taskIndex].deadline,
			"Deadline has passed"
		);
		require(
			!tasks[msg.sender][taskIndex].givenUp,
			"Task has been given up"
		);
		tasks[msg.sender][taskIndex].achieved = true;

		if (
			tasks[msg.sender][taskIndex].verificationMethod ==
			VerificationMethod.LitAction
		) {
			// ***** LitAction evidence is a signature from the lit nodes
			tasks[msg.sender][taskIndex].evidence = _evidence;
		} else if (
			tasks[msg.sender][taskIndex].verificationMethod ==
			VerificationMethod.UMA
		) {
			// ***** UMA evidence is the "subjective" truth with a challenge window of 120 seconds
			assertionId = oov3.assertTruthWithDefaults(
				_evidence,
				address(this)
			);
		}

		address recoveredAddress = recoverAddress(
			bytes32(tasks[msg.sender][taskIndex].verificationMaterial),
			_evidence
		);

		console.log("recoverd address: %s", recoveredAddress);

		emit TaskAchieved(msg.sender, taskIndex);
	}

	function distributeStakeAfterDeadline(uint256 taskIndex) public {
		require(
			block.timestamp > tasks[msg.sender][taskIndex].deadline,
			"Deadline has not passed yet"
		);
		require(!tasks[msg.sender][taskIndex].achieved, "Task was achieved");

		uint256 toDistribute = tasks[msg.sender][taskIndex].stake;

		// Calculate even reward for each staker
		uint256 reward = toDistribute / stakers.length;

		// Distribute the reward among stakers
		for (uint256 i = 0; i < stakers.length; i++) {
			address staker = stakers[i];
			require(token.transfer(staker, reward), "Transfer failed");
		}

		// Update the task
		tasks[msg.sender][taskIndex].givenUp = true;
		tasks[msg.sender][taskIndex].stake = 0;
	}

	function unstakeTokens(uint256 _amount) public {
		require(
			stakersBalances[msg.sender] >= _amount,
			"Not enough tokens staked"
		);
		stakersBalances[msg.sender] -= _amount;
		require(token.transfer(msg.sender, _amount), "Transfer failed");
	}

	function giveUp(uint256 taskIndex) public {
		require(taskIndex < tasks[msg.sender].length, "Invalid task index");
		require(!tasks[msg.sender][taskIndex].givenUp, "Task already given up");

		tasks[msg.sender][taskIndex].givenUp = true;
	}

	// Idea: we can utilise Lit Protocol immutable serverless function that has signing capability to ask the nodes to sign if a statment is true or not, the returned. signatures are then combined client-side, in this case in the verification-server.
	function verify(uint256 taskIndex, address user) public {
		bool success = false;

		if (
			tasks[user][taskIndex].verificationMethod ==
			VerificationMethod.LitAction
		) {
			// ***** LitAction verification
			address recoveredAddress = recoverAddress(
				bytes32(tasks[msg.sender][taskIndex].verificationMaterial),
				tasks[user][taskIndex].evidence
			);

			console.log("recoverd address: %s", recoveredAddress);

			if (
				recoveredAddress == tasks[user][taskIndex].verificationAddress
			) {
				success = true;
			}
		} else if (
			tasks[user][taskIndex].verificationMethod == VerificationMethod.UMA
		) {
			// **** UMA verification
			// if it has not been disputed and it has passed the challenge window, and return the result.
			// result
			success = oov3.settleAndGetAssertionResult(assertionId);
		}

		tasks[user][taskIndex].verified = success;

		if (success) {
			token.transfer(user, tasks[user][taskIndex].stake);
		}

		emit TaskVerified(user, success);
	}

	function depositStake(uint256 amount, uint256 taskIndex) public {
		// Ensure the task index is valid
		require(taskIndex < tasks[msg.sender].length, "Invalid task index");

		// Ensure that a task has been set for the user
		require(
			bytes(tasks[msg.sender][taskIndex].description).length > 0,
			"Task not set for user"
		);

		require(
			token.transferFrom(msg.sender, address(this), amount),
			"Transfer failed"
		);
		tasks[msg.sender][taskIndex].stake += amount;
	}

	function withdrawStake(uint256 amount, uint256 taskIndex) public {
		require(taskIndex < tasks[msg.sender].length, "Invalid task index");
		require(
			tasks[msg.sender][taskIndex].stake >= amount,
			"Insufficient stake"
		);
		require(
			!tasks[msg.sender][taskIndex].givenUp,
			"Cannot withdraw from a given up task"
		);

		require(token.transfer(msg.sender, amount), "Transfer failed");

		require(tasks[msg.sender][taskIndex].verified, "Task not verified");

		tasks[msg.sender][taskIndex].stake -= amount;
	}

	function getTasks(address user) public view returns (Task[] memory) {
		return tasks[user];
	}
}