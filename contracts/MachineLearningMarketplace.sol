// We need a way for buyers and sellers to interact, a function to place an order for training a model and a function to submit training by sellers after they've trained the model with their results. The sellers will upload the dataset json url they got and the resulting weight and bias. The buyers will upload 1 or more datasets with an array of URLs which have to be json files that can be uploaded for free on github, from 1 to 10 elements of data to verify the cost of the trained model and the payment for training. Each model will have a maximum time of 3 days to be trained.
// We also need functions to verify the quality of the trained model which will be done with a simple cost function that will return the error for a particular data field.

pragma solidity 0.5.5;

contract MachineLearningMarketplace {
    event AddedJob(uint256 indexed id, uint256 indexed timestamp);

    struct Model {
        string datasetUrl;
        uint256 result;
        uint256 x;
        uint256 weight;
        uint256 bias;
        uint256 payment;
        uint256 timestamp;
    }
    mapping(uint256 => Model) public models;
    uint256 public latestId;

    /// @notice To upload a model in order to train it
    /// @param _dataSetUrl The url with the json containing the array of data
    /// @param result One resulting data element
    /// @param x An independent variable
    function uploadJob(string memory _dataSetUrl, uint256 result, uint256 x) public payable {
        require(msg.value > 0, 'You must send some ether to get your model trained');

        Model memory m = Model(_dataSetUrl, result, x, 0, 0, msg.value, now);
        models[latestId] = m;
        emit AddedJob(latestId, now);
    }

    /// @notice The cost function implemented in solidity
    /// @param _result The resulting uint256 for a particular data element
    /// @param _weight The weight of the trained model
    /// @param _bias The bias of the trained model
    /// @param _x The independent variable for our trained model to test the prediction
    /// @return int256 Returns the total error of the model
    function cost(int256 _result, int256 _weight, int256 _bias, int256 _x) public pure returns(int256) {
        require(_results.length == _xs.length, 'There must be the same number of _results than _xs values');
        int256 error = 0; // Notice the int instead of uint since we want negative values too
        uint256 numberOfDataPoints = _xs.length;
        for(uint256 i = 0; i < numberOfDataPoints; i++) {
            error += (_results[i] - (_weight * _xs[i] + _bias)) * (_results[i] - (_weight * _xs[i] + _bias));
        }
        return error / int256(numberOfDataPoints);
    }

    /// @notice To get a model dataset, payment and timestamp
    /// @param id The id of the model to get the dataset, payment and timestamp
    /// @return Returns the dataset string url, payment and timestamp
    function getModel(uint256 id) public view returns(string memory, uint256, uint256) {
        return (models[id].datasetUrl, models[id].payment, models[id].timestamp);
    }
}
