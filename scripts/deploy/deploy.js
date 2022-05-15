const hre = require("hardhat");
const express = require('express')
const app = express()
const port = 3000


async function main() {
    const wlToken = await hre.ethers.getContractFactory("WLToken");
    const wl = await wlToken.deploy();
    await wl.mint("0x22c8F656a4599A79619E5756A5b6cB8eaA193bD7", 9);

    console.log(wl.address);
}
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
