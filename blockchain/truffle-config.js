const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "size scheme style zoo nation fall good fat decline main dilemma"; // a single word was omitted for security purposes
const alchemyApiKey = "n-RMyK48LJWxC1Tq6s1a2wAII5Vfit51";

module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
      network_id: 11155111,  
      gas: 4500000,          
      gasPrice: 10000000000, 
    },
  },

  compilers: {
    solc: {
      version: "0.8.20",  
      settings: {
        optimizer: {
          enabled: true,
          runs: 200  
        },
        viaIR: true  
      }
    }
  },
};
