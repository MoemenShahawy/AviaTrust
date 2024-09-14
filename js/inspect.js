document.getElementById("getDataButton").addEventListener("click", async function(event) {
    event.preventDefault();

    const flightId = document.getElementById("flightIdInput").value;
    const flightDataContainer = document.getElementById("flightDataContainer");
    const flightDataList = document.getElementById("flightDataList");
    const errorMessage = document.getElementById("errorMessage");
    const loadingSpinner = document.getElementById("loadingSpinner");

    flightDataContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    flightDataList.innerHTML = ''; // Clear previous results
    loadingSpinner.style.display = 'inline-block';

    if (flightDataRecorder) {
        try {
            const data = await flightDataRecorder.methods.getFlightData(flightId).call();
            loadingSpinner.style.display = 'none';
            if (data.length > 0) {
                data.forEach(entry => {
                    const flightDataCard = document.createElement('div');
                    flightDataCard.classList.add('flight-data-card');
                    const timestamp = new Date(entry.timestamp * 1000).toLocaleString();
                    const recordTime = new Date(entry.recordTime * 1000).toLocaleString();
                    flightDataCard.innerHTML = `
                        <div class="tooltip">${recordTime}</div>
                        <p><strong>Flight ID:</strong> ${entry.flightId}</p>
                        <p><strong>Pilot ID:</strong> ${entry.pilotId}</p>
                        <p><strong>Passenger Count:</strong> ${entry.passengerCount}</p>
                        <p><strong>Gross Weight:</strong> ${entry.grossWeight} kg</p>
                        <p><strong>Altitude:</strong> ${entry.altitude} ft</p>
                        <p><strong>Air Speed:</strong> ${entry.airSpeed} knots</p>
                        <p><strong>Aileron Position:</strong> ${entry.aileronPosition}°</p>
                        <p><strong>Spoiler Position:</strong> ${entry.spoilerPosition}°</p>
                        <p><strong>Elevator Position:</strong> ${entry.elevatorPosition}°</p>
                        <p><strong>Rudder Position:</strong> ${entry.rudderPosition}°</p>
                        <p><strong>Engine EGT:</strong> ${entry.engineEGT} °C</p>
                        <p><strong>Engine Compressor Speed:</strong> ${entry.engineCompressorSpeed} RPM</p>
                        <p><strong>Engine Turbine Speed:</strong> ${entry.engineTurbineSpeed} RPM</p>
                        <p><strong>Fuel Flow:</strong> ${entry.fuelFlow} L/h</p>
                        <p><strong>Record Time:</strong> ${recordTime}</p>
                        <p><strong>Blockchain Timestamp:</strong> ${timestamp}</p>
                    `;

                    flightDataList.appendChild(flightDataCard);
                });

                flightDataContainer.style.display = 'block';

            } else {
                errorMessage.innerText = "No flight data found for this Flight ID.";
                errorMessage.style.display = 'block';
            }

        } catch (error) {
            console.error("Error fetching flight data:", error);
            errorMessage.innerText = "Error fetching flight data. Please ensure the flight ID is correct.";
            errorMessage.style.display = 'block';
            loadingSpinner.style.display = 'none';
        }
    } else {
        errorMessage.innerText = "Please connect your wallet first.";
        errorMessage.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }
});
