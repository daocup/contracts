// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./TokenTimeLock.sol";
import "./CUPSale.sol";

contract TokenTimeLockProxyFactory is Initializable, UUPSUpgradeable, OwnableUpgradeable, LockFactory {
    mapping(address => address[]) wallets;
    address masterContract;

    function initialize(address _masterContract) external initializer {
        require(_masterContract != address(0), "Compatible address");
        __Ownable_init();
        __UUPSUpgradeable_init();

        masterContract = _masterContract;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function createBlockWallet(
        address user_,
        address token_,
        uint256 amount_,
        uint32[] calldata lockDurations_,
        uint8[] calldata releasePercents_,
        uint256 startDate_
    )
    external
    override
    returns (address) {
        TokenTimeLock timeLockWallet = TokenTimeLock(Clones.clone(masterContract));
        bool setupResult = timeLockWallet.initialize(
            user_,
            token_,
            amount_,
            lockDurations_,
            releasePercents_,
            startDate_
        );
        wallets[user_].push(address(timeLockWallet));
        require(setupResult, "TokenTimeLock contract: can't setup");
        return address(timeLockWallet);
    }

    function getLockWallets(address owner_)
    external
    override
    view returns (address[] memory){
        return wallets[owner_];
    }

    receive() external payable {
        revert();
    }
}
