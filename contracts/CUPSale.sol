// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
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

contract CUPSale is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    string public name;
    address public token;
    LockFactory private lockerFactory;
    uint public rate;
    bytes4 private constant TRANSFER_SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
    bytes4 private constant TRANSFER_FROM_SELECTOR = bytes4(keccak256(bytes('transferForm(address, address,uint256)')));

    event TokensPurchased(
        address account,
        address wallet,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    function initialize(address _token, LockFactory _locker) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        lockerFactory = _locker;
        token = _token;
        rate = 3000000;
        name = "CUP Sale Contract";
    }

    function buyTokens() public payable {
        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;

        // Require that AAAEth has enough tokens
        require(IBEP20(token).balanceOf(address(this)) >= tokenAmount);

        // Transfer tokens to the user
        (uint32[] memory lockAmount, uint8[] memory percentRelease) = releaseStrategy();
        address lockAddress = LockFactory(lockerFactory).createBlockWallet(msg.sender, token, tokenAmount, lockAmount, percentRelease, block.timestamp);

        _safeTransfer(token, lockAddress, tokenAmount);
        // Emit an event
        emit TokensPurchased(msg.sender, lockAddress, tokenAmount, rate);
    }

    function _safeTransfer(address _token, address to, uint value) private {
        (bool success, bytes memory data) = _token.call(abi.encodeWithSelector(TRANSFER_SELECTOR, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'CUP: TRANSFER_FAILED');
    }

    function _safeTransferFrom(address _token, address from, address to, uint value) private {
        (bool success, bytes memory data) = _token.call(abi.encodeWithSelector(TRANSFER_FROM_SELECTOR, from, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'CUP: TRANSFER_FROM_FAILED');
    }

    function sellTokens(uint _amount) public payable {
        // User can't sell more tokens than they have
//        require(IBEP20(token).balanceOf(msg.sender) >= _amount);

        // Calculate the amount of Ether to redeem
        uint etherAmount = _amount / rate;

        // Require that AAAEth has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        _safeTransferFrom(token, msg.sender, address(this), _amount);
        payable(msg.sender).call{value:etherAmount}("");

//        payable(msg.sender).transfer(etherAmount);

        // Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
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

    function release(address wallet) public returns(bool){
        TokenTimeLock(wallet).release();
        return true;
    }

    function releaseStrategy() private pure returns(uint32[] memory, uint8[] memory) {
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
        return (lockAmount , percentRelease);
    }
}
