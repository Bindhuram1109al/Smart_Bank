const express = require('express');
const Web3 = require('web3');
const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/YOUR_PROJECT_ID'));

const smartBankContractAddress = '0x...';
const smartBankContractABI = [...];

app.post('/deploy-contract', async (req, res) => {
    const { name, symbol, totalSupply } = req.body;
    const smartBankContract = new web3.eth.Contract(smartBankContractABI, smartBankContractAddress);
    try {
        const txCount = await web3.eth.getTransactionCount();
        const tx = {
            from: '0x...', // Your Ethereum account address
            to: smartBankContractAddress,
            value: web3.utils.toWei('0', 'ether'),
            gas: '20000',
            gasPrice: web3.utils.toWei('20', 'gwei'),
            data: smartBankContract.methods.createToken(name, symbol, totalSupply).encodeABI()
        };
        const signedTx = await web3.eth.accounts.signTransaction(tx, '0x...'); // Your Ethereum account private key
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ message: 'Contract deployed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deploying contract' });
    }
});

app.get('/token-info', async (req, res) => {
    const tokenAddress = req.query.tokenAddress;
    const smartBankContract = new web3.eth.Contract(smartBankContractABI, smartBankContractAddress);
    try {
        const tokenInfo = await smartBankContract.methods.getTokenInfo(tokenAddress).call();
        res.json(tokenInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching token info' });
    }
});

app.get('/user-token-balance', async (req, res) => {
    const userAddress = req.query.userAddress;
    const tokenAddress = req.query.tokenAddress;
    const smartBankContract = new web3.eth.Contract(smartBankContractABI, smartBankContractAddress);
    try {
        const balance = await smartBankContract.methods.getUserTokenBalance(userAddress, tokenAddress).call();
        res.json(balance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user token balance' });
    }
});

app.post('/swap-token', async (req, res) => {
    const tokenAddress = req.body.tokenAddress;
    const amount = req.body.amount;
    const smartBankContract = new web3.eth.Contract(smartBankContractABI, smartBankContractAddress);
    try {
        const txCount = await web3.eth.getTransactionCount();
        const tx = {
            from: '0x...', // Your Ethereum account address
            to: