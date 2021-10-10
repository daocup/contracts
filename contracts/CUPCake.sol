// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./BEP20/IBEP20.sol";
import "./CUP.sol";
import "./TokenTimeLock.sol";

interface LockFactory {
    function createBlockWallet(
        address user_,
        address token_,
        uint256 amount_,
        uint32[] calldata lockDurations_,
        uint8[] calldata releasePercents_,
        uint256 startDate_
    ) external returns (address);

    function getLockWallets(address owner) external view returns (address[] memory);
}

abstract contract CUPCake is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    using SafeMath for uint256;
    uint256 public deadline;
    string public name;
    address public token;
    LockFactory private lockerFactory;
    uint public rate;
    uint256 public totalReward;
    bytes4 private constant TRANSFER_FROM_SELECTOR = bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));

    event TokensPurchased(
        address indexed account,
        address wallet,
        uint256 amount,
        uint rate,
        uint256 reward
    );

    event TokensSold(
        uint256 amount,
        uint256 reward
    );

    function __CUPCake_init(address token_, address locker_, uint256 deadline_, uint rate_) internal initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        lockerFactory = LockFactory(locker_);
        token = token_;
        name = "CUP Sale Contract";
        totalReward = 0;
        deadline = deadline_;
        rate = rate_;
    }

    function buyTokens(uint8 lock) public payable {
        if (deadline > 0) {
            require(block.timestamp < deadline, "CUPCake: End of sale. Goodbye!");
        }
        (uint32[] memory lockAmount, uint8[] memory percentRelease, uint256 reward) = releaseStrategy(lock);
        // Calculate the number of tokens to buy
        uint256 tokenAmount = msg.value * rate;
        uint256 rewardAmount = tokenAmount.mul(reward).div(100);
        tokenAmount = tokenAmount + rewardAmount;
        totalReward = totalReward + rewardAmount;

        // Transfer tokens to the user
        require(IBEP20(token).balanceOf(owner()) >= tokenAmount);
        address lockAddress = LockFactory(lockerFactory).createBlockWallet(msg.sender, token, tokenAmount, lockAmount, percentRelease, block.timestamp);

        _safeTransferFrom(token, owner(), lockAddress, tokenAmount);
        // Emit an event
        emit TokensPurchased(msg.sender, lockAddress, tokenAmount, rate, reward);
    }

    function _safeTransferFrom(address _token, address sender, address recipient, uint value) private {
        (bool success, bytes memory data) = _token.call(abi.encodeWithSelector(TRANSFER_FROM_SELECTOR, sender, recipient, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'CUP: TRANSFER_FROM_FAILED');
    }

    function getWallets() public view returns (address[] memory) {
        return factory().getLockWallets(msg.sender);
    }

    function factory() public view returns (LockFactory) {
        return LockFactory(lockerFactory);
    }

    function _authorizeUpgrade(address newImplementation) internal override {}

    function daysToSeconds(uint32 day) private pure returns (uint32) {
        return day * 60 * 60 * 24;
    }

    function releaseStrategy(uint8 lock) private pure returns (uint32[] memory, uint8[] memory, uint256) {
        if (lock == 12) {
            return release12MonthsStrategy();
        }

        if (lock == 6) {
            return release6MonthsStrategy();
        }

        return release3MonthsStrategy();
    }

    function release12MonthsStrategy() private pure returns (uint32[] memory, uint8[] memory, uint256) {
        uint32[] memory lockAmount = new uint32[](5);
        lockAmount[0] = daysToSeconds(30 * 5);
        lockAmount[1] = daysToSeconds(30 * 7);
        lockAmount[2] = daysToSeconds(30 * 9);
        lockAmount[3] = daysToSeconds(30 * 11);
        lockAmount[4] = daysToSeconds(30 * 12);
        uint8[] memory percentRelease = new uint8[](5);
        percentRelease[0] = 40;
        percentRelease[1] = 30;
        percentRelease[2] = 20;
        percentRelease[3] = 7;
        percentRelease[4] = 3;
        return (lockAmount, percentRelease, uint256(50));
    }

    function release6MonthsStrategy() private pure returns (uint32[] memory, uint8[] memory, uint256) {
        uint32[] memory lockAmount = new uint32[](5);
        lockAmount[0] = daysToSeconds(30 * 2);
        lockAmount[1] = daysToSeconds(30 * 3);
        lockAmount[2] = daysToSeconds(30 * 4);
        lockAmount[3] = daysToSeconds(30 * 5);
        lockAmount[4] = daysToSeconds(30 * 6);
        uint8[] memory percentRelease = new uint8[](5);
        percentRelease[0] = 40;
        percentRelease[1] = 30;
        percentRelease[2] = 20;
        percentRelease[3] = 7;
        percentRelease[4] = 3;
        return (lockAmount, percentRelease, uint256(20));
    }

    function release3MonthsStrategy() private pure returns (uint32[] memory, uint8[] memory, uint256) {
        uint32[] memory lockAmount = new uint32[](5);
        lockAmount[0] = daysToSeconds(15 * 2);
        lockAmount[1] = daysToSeconds(15 * 3);
        lockAmount[2] = daysToSeconds(15 * 4);
        lockAmount[3] = daysToSeconds(15 * 5);
        lockAmount[4] = daysToSeconds(15 * 6);
        uint8[] memory percentRelease = new uint8[](5);
        percentRelease[0] = 40;
        percentRelease[1] = 30;
        percentRelease[2] = 20;
        percentRelease[3] = 7;
        percentRelease[4] = 3;
        return (lockAmount, percentRelease, uint256(10));
    }

    function activeDeadline(uint8 days_) public onlyOwner {
        deadline = block.timestamp + daysToSeconds(days_);
    }

    function completeSale() public onlyOwner{
        require(block.timestamp > deadline, "Need to complete Sale deadline");
        uint256 balance = address(this).balance;
        emit TokensSold(balance, totalReward);
        payable(msg.sender).transfer(balance);
    }

    receive() external payable {
        buyTokens(12);
    }
}
