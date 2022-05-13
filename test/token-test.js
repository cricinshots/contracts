const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WLToken", function () {
    it("Should return the new greeting once it's changed", async function () {
        const wl = await ethers.getContractFactory("WLToken");
    });
});
