if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
    console.log('Web3 Detected!');
} else {
    console.log('No Web3 Detected... using HTTP Provider');
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

// Load the JSON contract from the blockchain build data
async function loadContract() {
    const response = await fetch('blockchain/build/contracts/FlightDataRecorder.json');
    const contractData = await response.json();
    return contractData;
}

async function onConnectUIUpdate() {
    const statusElement = document.getElementById("status");
    const walletAddressElement = document.getElementById("walletAddress");
    const connectButton = document.getElementById("connectButton");
    const disconnectButton = document.getElementById("disconnectButton");

    connectButton.disabled = true;
    connectButton.classList.remove('btn-primary');
    connectButton.classList.add('btn-success');
    connectButton.innerText = "Wallet Connected Successfully!";
    
    disconnectButton.style.display = 'inline-block';

    statusElement.style.display = 'none';
    walletAddressElement.style.display = 'block';
    walletAddressElement.innerText = "Connected account: " + (await web3.eth.getAccounts())[0];

    $('#inspectLi > a').removeClass('disabled');
    $('#insertLi > a').removeClass('disabled');
}

function onDisconnectUIUpdate() {
    const connectButton = document.getElementById("connectButton");
    const disconnectButton = document.getElementById("disconnectButton");
    const walletAddressElement = document.getElementById("walletAddress");

    connectButton.disabled = false;
    connectButton.classList.remove('btn-success');
    connectButton.classList.add('btn-primary');
    connectButton.innerText = "Connect Wallet";
    
    disconnectButton.style.display = 'none';

    walletAddressElement.style.display = 'none';
    walletAddressElement.innerText = '';

    // Disable other navigation links
    $('#inspectLi > a').addClass('disabled');
    $('#insertLi > a').addClass('disabled');
}

$('#connectButton').on('click', async () => {
    const statusElement = document.getElementById("status");

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        try {
            statusElement.style.display = 'block';
            statusElement.innerText = "Connecting to wallet...";
            
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            contractData = await loadContract();
            const contractABI = contractData.abi;
            const contractAddress = contractData.networks['11155111'].address; // Sepolia network ID

            flightDataRecorder = new web3.eth.Contract(contractABI, contractAddress);
            walletIsInitialized = true;

            setTimeout(onConnectUIUpdate, 1500);

        } catch (error) {
            console.error("User denied account access or error occurred:", error);
            statusElement.style.display = 'block';
            statusElement.classList.remove('alert-info');
            statusElement.classList.add('alert-danger');
            statusElement.innerText = "User denied account access.";
        }
    } else {
        console.warn("Non-Ethereum browser detected. You should consider trying MetaMask!");
        statusElement.style.display = 'block';
        statusElement.classList.remove('alert-info');
        statusElement.classList.add('alert-warning');
        statusElement.innerText = "Non-Ethereum browser detected. You should consider trying MetaMask!";
    }
});

$('#disconnectButton').on('click', () => {
    flightDataRecorder = null;
    contractData = null;
    walletIsInitialized = false;

    onDisconnectUIUpdate();
});