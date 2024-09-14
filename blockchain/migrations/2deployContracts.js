const FlightDataRecorder = artifacts.require("FlightDataRecorder");

module.exports = function (deployer) {
    deployer.deploy(FlightDataRecorder);
};