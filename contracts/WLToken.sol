// SPDX-License-Identifier: GPLv3
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract WLToken is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor

    constructor() {

        console.log("Constructor called");
        initialize();
        _disableInitializers();
        //        console.log(_disableInitializers());
    }

    function initialize() initializer public {
        __ERC20_init("WLToken", "WLT");
        __ERC20Burnable_init();
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        console.log("This is the owner");
        console.log(owner());
        console.log(decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    function checkSupply() public view returns (uint256) {
        console.log("Checking supply");
        console.log(totalSupply());
        return totalSupply();
    }
    function mint(address to, uint256 amount) public onlyOwner {

        _mint(to, amount);
        console.log("Minted", amount, "to", to);
    }

    function burn2(address to, uint256 amount) public onlyOwner {

        _burn(to, amount);
        console.log("Burned", amount, "to", to);
    }

    function balanceOfUser(address to) public view returns (uint256 balance) {
        console.log("Balance of user", to, "is", balanceOf(to));
        return balanceOf(to);
    }
    //    function supply() public view returns (uint256 supply) {
    //        console.log("Supply is", supply);
    //        return supply;
    //    }


    function _beforeTokenTransfer(address from, address to, uint256 amount)
    internal
    whenNotPaused
    override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _authorizeUpgrade(address newImplementation)
    internal
    onlyOwner
    override
    {}
}