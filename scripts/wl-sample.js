// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const express = require('express')

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');
    // We get the contract to deploy
    const wlToken = await hre.ethers.getContractFactory("WLToken");
    const kl = await wlToken.deploy();

    let wl = (await hre.ethers.getContractAt("WLToken", kl.address));
    // await wl.deployed();
    // console.log(wl);
    await wl.mint("0x22c8F656a4599A79619E5756A5b6cB8eaA193bD7", 9);
    // await wl.checkSupply();

    // await wl.balanceOfUser("0xbda5747bfd65f08deb54cb465eb87d40e51b197e");
    // await wl.burn2("0xbda5747bfd65f08deb54cb465eb87d40e51b197e", 100);
    console.log(wl.address);
    console.log(await wl.balanceOfUser("0x22c8F656a4599A79619E5756A5b6cB8eaA193bD7"));
    // await wl.balanceOfUser("0xbda5747bfd65f08deb54cb465eb87d40e51b197e");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
