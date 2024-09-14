document.getElementById("insertButton").addEventListener("click", async function() {
    const flightId = document.getElementById("flightId").value;
    const pilotId = document.getElementById("pilotId").value;
    const passengerCount = document.getElementById("passengerCount").value;
    const grossWeight = document.getElementById("grossWeight").value;
    const altitude = document.getElementById("altitude").value;
    const airSpeed = document.getElementById("airSpeed").value;
    const aileronPosition = document.getElementById("aileronPosition").value;
    const spoilerPosition = document.getElementById("spoilerPosition").value;
    const elevatorPosition = document.getElementById("elevatorPosition").value;
    const rudderPosition = document.getElementById("rudderPosition").value;
    const engineEGT = document.getElementById("engineEGT").value;
    const engineCompressorSpeed = document.getElementById("engineCompressorSpeed").value;
    const engineTurbineSpeed = document.getElementById("engineTurbineSpeed").value;
    const fuelFlow = document.getElementById("fuelFlow").value;
    const recordTime = document.getElementById("recordTime").value;
    const statusMessage = document.getElementById("statusMessage");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const insertButton = document.getElementById("insertButton");

    statusMessage.style.display = 'none';
    insertButton.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';;

    if (flightDataRecorder) {
        try {
            await flightDataRecorder.methods.recordFlightData(
                flightId,
                pilotId,
                passengerCount,
                grossWeight,
                altitude,
                airSpeed,
                aileronPosition,
                spoilerPosition,
                elevatorPosition,
                rudderPosition,
                engineEGT,
                engineCompressorSpeed,
                engineTurbineSpeed,
                fuelFlow,
                recordTime
            ).send({ from: (await web3.eth.getAccounts())[0] });

            statusMessage.innerText = "Flight data successfully recorded!";
            statusMessage.classList.remove('alert-danger');
            statusMessage.classList.add('alert-success');
            statusMessage.style.display = 'block';
            loadingSpinner.style.display = 'none';

        } catch (error) {
            console.error("Error recording flight data:", error);
            statusMessage.innerText = "Error recording flight data. See console for details.";
            statusMessage.classList.remove('alert-success');
            statusMessage.classList.add('alert-danger');
            statusMessage.style.display = 'block';
            insertButton.style.display = 'block';
            loadingSpinner.style.display = 'none';
        }
    } else {
        statusMessage.innerText = "Please connect your wallet first.";
        statusMessage.classList.remove('alert-success');
        statusMessage.classList.add('alert-danger');
        statusMessage.style.display = 'block';
        insertButton.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }
});
