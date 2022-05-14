const hre = require("hardhat");
const express = require('express')
const {static} = require("express");
const app = express()
const port = 3000

let wl=null;
async function start()
{
    const wlToken = await hre.ethers.getContractFactory("WLToken");
    wl = await wlToken.deploy();
}
start();
async function mint()
{
    await wl.deployed()
    await wl.mint("0xbda5747bfd65f08deb54cb465eb87d40e51b197e", 1);
}

app.get('/', (req, res) =>{ res.send('Hello World!')
    mint()})


app.listen(port, () => console.log(`app listening on port ${port}!`))