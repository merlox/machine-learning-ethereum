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
        const id = 0
        const datasetUrl = 'https://example.com' // Suppose this is the dataset shown in the previous section
        const payment = 100000000000000000 // 0.1 ether
        await machineLearningMarketplace.uploadJob(datasetUrl, { value: payment })
        const uploadedModel = await machineLearningMarketplace.getModel(id)
        uploadedModel[0].should.equal(datasetUrl)
        parseInt(uploadedModel[1]).should.equal(payment)
    })
    it('Should upload a result for an existing job', async () => {
        const id = 0
        const datasetUrl = 'https://example.com'
        const payment = 100000000000000000 // 0.1 ether
        await machineLearningMarketplace.uploadJob(datasetUrl, { value: payment })
        const uploadedModel = await machineLearningMarketplace.getModel(id)
        uploadedModel[0].should.equal(datasetUrl)
        parseInt(uploadedModel[1]).should.equal(payment)

        const trainedWeight = 0.0090
        const trainedBias = 0.0629
        const trainedWeightWithDecimals = 0.0090 * 1e10
        const trainedBiasWithDecimals = 0.0629 * 1e10
        await machineLearningMarketplace.uploadResult(id, trainedWeightWithDecimals, trainedBiasWithDecimals)
        await waitEvent()
    })
    it('Should choose a winning model', async () => {
    })
})

function waitEvent() {
    console.log('Waiting event')
    return new Promise((resolve, reject) => {
        machineLearningMarketplace.AddedResult().on('data', newEvent => {
            return resolve(newEvent)
        })
    })
}
