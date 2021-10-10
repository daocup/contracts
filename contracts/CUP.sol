// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./BEP20/SafeBEP20.sol";
import "./BEP20/IBEP20.sol";
import "./BEP20/BaseERC20.sol";


contract CUP is Initializable, BaseERC20, UUPSUpgradeable {
    using SafeMath for uint256;

    bytes32 public DOMAIN_SEPARATOR;
    bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender, uint256 value, uint256 nonce, uint256 deadline)");
    mapping(address => uint) public nonces;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() external initializer {
        __ERC20_init("DAOCup", "CUP");
        __Ownable_init();
        __UUPSUpgradeable_init();

        mint(msg.sender, uint256(90000000000).mul(uint256(10) ** 18));

        uint chainId;
        assembly {
            chainId := chainid()
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name, string version, uint256 chainId, address verifyingContract)'),
                keccak256(bytes("DAOCup")),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function permit(address owner_, address spender_, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
        require(deadline >= block.timestamp, 'CUP: EXPIRED');
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner_, spender_, value, nonces[owner_]++, deadline))
            )
        );
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == owner_, 'CUP: INVALID_SIGNATURE');
        _approve(owner_, spender_, value);
    }
}