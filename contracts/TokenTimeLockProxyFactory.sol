// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./TokenTimeLock.sol";

contract TokenTimeLockProxyFactory is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    mapping(address => address) wallets;
    address masterContract;

    event Created(
        address indexed wallet,
        address indexed beneficiary,
        uint256 releaseTime,
        uint256 amount
    );

    function initialize(address _masterContract) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();

        masterContract = _masterContract;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function createBlockWallet(
        address owner_,
        address user_,
        address token_,
        uint256 amount_,
        uint32[] calldata lockDurations_,
        uint32[] calldata releasePercents_,
        uint64 startDate_
    ) public returns (address) {
        TokenTimeLock timeLockWallet = TokenTimeLock(Clones.clone(masterContract));
        bool setupResult = timeLockWallet.initialize(
            owner_,
            user_,
            token_,
            amount_,
            lockDurations_,
            releasePercents_,
            startDate_
        );
        wallets[user_] = address(timeLockWallet);
        require(setupResult, "TokenTimeLock contract: can't setup");
        emit Created(
            address(timeLockWallet),
            msg.sender,
            block.timestamp,
            amount_
        );
        return wallets[user_];
    }

    function getWalletList(address owner) public view returns (address){
        return wallets[owner];
    }

}
