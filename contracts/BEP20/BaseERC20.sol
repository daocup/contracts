//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./IBEP20.sol";

/**
* Compatible with ERC-20 and BEP-20
*/
abstract contract BaseERC20 is ERC20Upgradeable, OwnableUpgradeable, IBEP20 {

    /**
     * @dev See {BEP20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {BEP20};
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender_, address recipient_, uint256 amount) public virtual override(ERC20Upgradeable, IBEP20) returns (bool) {
        return ERC20Upgradeable.transferFrom(sender_, recipient_, amount);
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override(ERC20Upgradeable, IBEP20) returns (string memory) {
        return ERC20Upgradeable.name();
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override(ERC20Upgradeable, IBEP20) returns (string memory) {
        return ERC20Upgradeable.symbol();
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual override(ERC20Upgradeable, IBEP20) returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override(ERC20Upgradeable, IBEP20) returns (uint256) {
        return ERC20Upgradeable.totalSupply();
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override(ERC20Upgradeable, IBEP20) returns (uint256) {
        return ERC20Upgradeable.balanceOf(account);
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override(ERC20Upgradeable, IBEP20) returns (bool) {
        return ERC20Upgradeable.transfer(recipient, amount);
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override(ERC20Upgradeable, IBEP20) returns (uint256) {
        return ERC20Upgradeable.allowance(owner, spender);
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override(ERC20Upgradeable, IBEP20) returns (bool) {
        return ERC20Upgradeable.approve(spender, amount);
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual override(ERC20Upgradeable) returns (bool) {
        return ERC20Upgradeable.decreaseAllowance(spender, addedValue);
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual override(ERC20Upgradeable) returns (bool) {
        return ERC20Upgradeable.decreaseAllowance(spender, subtractedValue);
    }

    function getOwner() external view override(IBEP20) returns (address) {
        return owner();
    }
}
