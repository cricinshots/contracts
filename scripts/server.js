const hre = require("hardhat");
const express = require('express')
const bodyParser = require("body-parser");
const {Contract} = require("ethers");
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let wl= null
async function start()
{
    wl = (await hre.ethers.getContractAt("WLToken", "0xDcCA35364b673Ab1fB13Bb3cbFcbe9fB19C6A8F9"));

}

start()
async function mint(address,count) {
    // wl = (await hre.ethers.getContractAt("WLToken", "0xDcCA35364b673Ab1fB13Bb3cbFcbe9fB19C6A8F9"));
    try {
        await wl.mint(address, count);
    }
    catch (e) {
        console.log(e);
    }
}
async function burn() {
    // wl = (await hre.ethers.getContractAt("WLToken", "0xDcCA35364b673Ab1fB13Bb3cbFcbe9fB19C6A8F9"));
    try {
        await wl.burn2("0x22c8F656a4599A79619E5756A5b6cB8eaA193bD7", 10);
    }
    catch  {
        console.log(e);
    }
}
async function balanceOf(address) {
    // wl = (await hre.ethers.getContractAt("WLToken", "0xDcCA35364b673Ab1fB13Bb3cbFcbe9fB19C6A8F9"));
    return await wl.balanceOf(address);
}


app.get('/mint', (req, res) => {

    try {
        mint(req.query.add, req.query.count);
        res.send('Minting...')
    }
    catch (e) {
        console.log(e)
    }
})
app.get('/burn', (req, res) => {
    try {
        burn(req.query.add, req.query.count);
        res.send('Burning...')
    }
    catch (e) {
        console.log(e)
    }
})
app.get('/balance', (req, res) => {
    try {
        console.log(req.query.add);
        balanceOf(req.query.add).then(function (result) {
            res.send(result.toString())
        })
    }
    catch (e) {
        console.log(e)
    }
})

try {
    app.listen(process.env.PORT ||port, () => console.log(`app listening on port ${port}!`))
}
catch (e) {
    console.log(e)
}