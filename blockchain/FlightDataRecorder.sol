pragma solidity ^0.8.0;

contract FlightDataRecorder {
    struct FlightData {
        uint256 flightId;
        string pilotId;
        uint256 passengerCount;
        uint256 grossWeight;
        uint256 altitude;
        uint256 airSpeed;
        int256 aileronPosition;
        int256 spoilerPosition;
        int256 elevatorPosition;
        int256 rudderPosition;
        uint256 engineEGT;
        uint256 engineCompressorSpeed;
        uint256 engineTurbineSpeed;
        uint256 fuelFlow;
        uint256 recordTime; // This represents the specific real time for this data entry to maintain a chronological order
        uint256 timestamp;  // This represents the block's timestamp when the data was recorded after staying in queue
    }

    // Mapping flightId to an array of FlightData slices or instances recorded under that unique flight ID
    mapping(uint256 => FlightData[]) public flightDataRecords;
    uint256 public flightDataCount;

    event FlightDataRecorded(uint256 flightId, uint256 timestamp);

    function recordFlightData(
        uint256 _flightId,
        string memory _pilotId,
        uint256 _passengerCount,
        uint256 _grossWeight,
        uint256 _altitude,
        uint256 _airSpeed,
        int256 _aileronPosition,
        int256 _spoilerPosition,
        int256 _elevatorPosition,
        int256 _rudderPosition,
        uint256 _engineEGT,
        uint256 _engineCompressorSpeed,
        uint256 _engineTurbineSpeed,
        uint256 _fuelFlow,
        uint256 _recordTime
    ) public {
        flightDataCount++;
        flightDataRecords[_flightId].push(
            FlightData(
                _flightId,
                _pilotId,
                _passengerCount,
                _grossWeight,
                _altitude,
                _airSpeed,
                _aileronPosition,
                _spoilerPosition,
                _elevatorPosition,
                _rudderPosition,
                _engineEGT,
                _engineCompressorSpeed,
                _engineTurbineSpeed,
                _fuelFlow,
                _recordTime,   
                block.timestamp
            )
        );
        emit FlightDataRecorded(_flightId, block.timestamp);
    }

    // Function to retrieve all data points for a specific flightId
    function getFlightData(uint256 _flightId) public view returns (FlightData[] memory) {
        return flightDataRecords[_flightId];
    }
}
