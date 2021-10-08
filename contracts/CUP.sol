// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./BEP20/SafeBEP20.sol";
import "./BEP20/IBEP20.sol";


contract CUP is Initializable, UUPSUpgradeable, OwnableUpgradeable, IBEP20 {
    using SafeMath for uint256;

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;
    uint8 private _decimals;
    string private _symbol;
    string private _name;

    bytes32 public DOMAIN_SEPARATOR;
    bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address owner,address spender, uint256 value, uint256 nonce, uint256 deadline)");
    mapping(address => uint) public nonces;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() external initializer {
        _name = "DAOCup";
        _symbol = "CUP";
        _decimals = 18;
        __Ownable_init();
        __UUPSUpgradeable_init();

        mint(msg.sender, uint256(9**10).mul(uint256(10) ** 18));

        uint chainId;
        assembly {
            chainId := chainid()
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name, string version, uint256 chainId, address verifyingContract)'),
                keccak256(bytes(_name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @dev Returns the bep token owner.
     */
    function getOwner() external view override returns (address) {
        return owner();
    }

    /**
     * @dev Returns the token decimals.
     */
    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Returns the token symbol.
     */
    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the token name.
     */
    function name() external view override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {BEP20-totalSupply}.
     */
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {BEP20-balanceOf}.
     */
    function balanceOf(address account_)
    external
    view
    override
    returns (uint256)
    {
        return _balances[account_];
    }

    /**
     * @dev See {BEP20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient_, uint256 amount)
    external
    override
    returns (bool)
    {
        _transfer(_msgSender(), recipient_, amount);
        return true;
    }

    /**
     * @dev See {BEP20-allowance}.
     */
    function allowance(address owner_, address spender_)
    external
    view
    override
    returns (uint256)
    {
        return _allowances[owner_][spender_];
    }

    /**
     * @dev See {BEP20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender_, uint256 amount)
    external
    override
    returns (bool)
    {
        _approve(_msgSender(), spender_, amount);
        return true;
    }

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
    function transferFrom(
        address sender_,
        address recipient_,
        uint256 amount
    ) external override returns (bool) {
        _transfer(sender_, recipient_, amount);
        _approve(
            sender_,
            _msgSender(),
            _allowances[sender_][_msgSender()].sub(
                amount,
                "BEP20: transfer amount exceeds allowance"
            )
        );
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {BEP20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender_, uint256 addedValue)
    public
    returns (bool)
    {
        _approve(
            _msgSender(),
            spender_,
            _allowances[_msgSender()][spender_].add(addedValue)
        );
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {BEP20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender_, uint256 subtractedValue)
    public
    returns (bool)
    {
        _approve(
            _msgSender(),
            spender_,
            _allowances[_msgSender()][spender_].sub(
                subtractedValue,
                "BEP20: decreased allowance below zero"
            )
        );
        return true;
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `msg.sender`, increasing
     * the total supply.
     *
     * Requirements
     *
     * - `msg.sender` must be the token owner
     */
    function mint(address to_, uint256 amount) public onlyOwner {
        _mint(to_, amount);
    }

    /**
     * @dev Burn `amount` tokens
     *
     * Requirements
     * - `msg.sender` must have a balance of at least `amount`
     */
    function burn(uint256 amount) public returns (bool) {
        _burn(_msgSender(), amount);
        return true;
    }

    /**
     * @dev Burn `amount` tokens of `account` from allowed sender
     */
    function burnFrom(address account_, uint256 amount) public returns (bool) {
        _burnFrom(account_, amount);
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(
        address sender_,
        address recipient_,
        uint256 amount
    ) internal {
        require(sender_ != address(0), "BEP20: transfer from the zero address");
        require(recipient_ != address(0), "BEP20: transfer to the zero address");

        _balances[sender_] = _balances[sender_].sub(
            amount,
            "BEP20: transfer amount exceeds balance"
        );
        _balances[recipient_] = _balances[recipient_].add(amount);
        emit Transfer(sender_, recipient_, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account_, uint256 amount) internal {
        require(account_ != address(0), "BEP20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account_] = _balances[account_].add(amount);
        emit Transfer(address(0), account_, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account_, uint256 amount) internal {
        require(account_ != address(0), "BEP20: burn from the zero address");

        _balances[account_] = _balances[account_].sub(
            amount,
            "BEP20: burn amount exceeds balance"
        );
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account_, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner_,
        address spender_,
        uint256 amount
    ) internal {
        require(owner_ != address(0), "BEP20: approve from the zero address");
        require(spender_ != address(0), "BEP20: approve to the zero address");

        _allowances[owner_][spender_] = amount;
        emit Approval(owner_, spender_, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`.`amount` is then deducted
     * from the caller's allowance.
     *
     * See {_burn} and {_approve}.
     */
    function _burnFrom(address account_, uint256 amount_) internal {
        _burn(account_, amount_);
        _approve(
            account_,
            _msgSender(),
            _allowances[account_][_msgSender()].sub(
                amount_,
                "BEP20: burn amount exceeds allowance"
            )
        );
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