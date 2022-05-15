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
    await wl.mint(address, count);
}
async function burn() {
     // wl = (await hre.ethers.getContractAt("WLToken", "0xDcCA35364b673Ab1fB13Bb3cbFcbe9fB19C6A8F9"));
    await wl.burn2("0x22c8F656a4599A79619E5756A5b6cB8eaA193bD7", 10);
}
async function balanceOf(address) {
    // wl = (await hre.ethers.getContractAt("WLToken", "0xDcCA35364b673Ab1fB13Bb3cbFcbe9fB19C6A8F9"));
    return await wl.balanceOf(address);
}


app.post('/mint', (req, res) => {

    mint(req.body.address,req.body.count);
    res.send('Minting...')
})
app.post('/burn', (req, res) => {
    burn(req.body.address,req.body.count);
    res.send('Burning...')
})
app.get('/balance', (req, res) => {
    console.log(req.query.add);
    balanceOf(req.query.add).then(function(result){
        res.send(result.toString())
    })
})


app.listen(port, () => console.log(`app listening on port ${port}!`))