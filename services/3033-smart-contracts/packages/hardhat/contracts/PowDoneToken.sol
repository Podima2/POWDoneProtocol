//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.16;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is the main building block for smart contracts.
contract PowDoneToken is ERC20 {
	// An address type variable is used to store ethereum accounts.
	address public owner;
	address[] public permittedDistributors;

	// The Transfer event helps off-chain applications understand
	// what happens within your contract.

	/**
	 * Contract initialization.
	 */
	constructor(
		address[] memory _permittedDistributors
	) ERC20("Proof of Work Done", "POWD") {
		uint256 initialSupply = 1111111 * (10 ** uint256(decimals()));
		_mint(msg.sender, initialSupply);
		owner = msg.sender;
		permittedDistributors = _permittedDistributors;

		// Mint tokens for each permitted distributor
		uint256 distributorSupply = 123456 * (10 ** uint256(decimals())); // Change this value as per your requirement
		for (uint256 i = 0; i < _permittedDistributors.length; i++) {
			_mint(_permittedDistributors[i], distributorSupply);
		}
	}

	function isPermittedDistributors(
		address _distributors
	) public view returns (bool) {
		for (uint256 i = 0; i < permittedDistributors.length; i++) {
			if (permittedDistributors[i] == _distributors) {
				return true;
			}
		}
		return false;
	}

	function airdrop(
		address[] memory recipients,
		uint256[] memory amounts
	) external {
		require(
			msg.sender == owner || isPermittedDistributors(msg.sender),
			"Only owner or permitted distributors can airdrop"
		);

		require(
			recipients.length == amounts.length,
			"Recipients and amounts arrays must have the same length"
		);

		// console.log the owner address
		console.log("Owner address is %s", owner);
		console.log("Sender address is %s", msg.sender);
		console.log("Owner balance is %s", balanceOf(owner));

		for (uint256 i = 0; i < recipients.length; i++) {
			address recipient = recipients[i];
			uint256 amount = amounts[i];

			require(balanceOf(owner) >= amount, "Not enough tokens to airdrop");

			// transfer
			_transfer(owner, recipient, amount);

			// emit
			emit Transfer(owner, recipient, amount);
		}
	}
}
