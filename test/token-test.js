const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("WLToken", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {


        const Token = await ethers.getContractFactory("WLToken");
        const hardhatToken = await Token.deploy();



    });
});
