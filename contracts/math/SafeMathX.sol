// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

library SafeMathX {
    using SafeMath for uint256;
    // Calculate x * y / scale rounding down.
    function mulScale(
        uint256 x,
        uint256 y,
        uint128 scale
    ) internal pure returns (uint256) {
        uint256 a = x.div(scale);
        uint256 b = x.mod(scale);
        uint256 c = y.div(scale);
        uint256 d = y.mod(scale);

        return a.mul(c).mul(scale).add(a.mul(d).add(b.mul(c)).add((b.mul(d).div(scale))));
    }
}
