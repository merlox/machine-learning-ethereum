const should = require('chai').should()
const ganache = require('ganache-cli').server({gasLimit: web3.utils.toHex(8e6)})
const MachineLearningMarketplace = artifacts.require('MachineLearningMarketplace')
let machineLearningMarketplace = {}

ganache.listen(8545, (err, blockchain) => {
    if(err) console.error(err)
})

contract('MachineLearningMarketplace', accounts => {
    beforeEach(async () => {
        console.log('What up')
    })
})
