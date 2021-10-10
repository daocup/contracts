// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CUPCake.sol";

contract EthSale is CUPCake {

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(address token_, address locker_) public initializer {
        __CUPCake_init(token_, locker_, 0, 77777);
    }
}
