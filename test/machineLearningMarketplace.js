const should = require('chai').should()
const ganache = require('ganache-cli').server({gasLimit: web3.utils.toHex(8e6)})
const MachineLearningMarketplace = artifacts.require('MachineLearningMarketplace')
let machineLearningMarketplace = {}

ganache.listen(8545, (err, blockchain) => {
    if(err) console.error(err)
})

contract('MachineLearningMarketplace', accounts => {
    beforeEach(async () => {
        machineLearningMarketplace = await MachineLearningMarketplace.new()
    })
    it('Should upload a new job model successfully', async () => {
        const datasetUrl = 'https://example.com'
        const payment = 100000000000000000 // 0.1 ether
        await machineLearningMarketplace.uploadJob(datasetUrl, { value: payment })
        const uploadedModel = await machineLearningMarketplace.getModel(0)
        uploadedModel[0].should.equal(datasetUrl)
        parseInt(uploadedModel[1]).should.equal(payment)
    })
    it('Should upload a result', async () => {

    })
    it('Should choose a winning model', async () => {
    })
})
