# AviaTrust
An artefact in partial fulfilment of the requirements of the Staffordshire University for the degree of Master of Computer Science (Business Computing)

Ensuring the integrity and security of flight data recording systems is crucial for upholding aviation safety and enabling rapid, cost-effective investigations of accidents and incidents. Although conventional Flight Data Recorders (FDRs) are crucial for collecting crucial data from many aircraft systems, such as flight controls, engine parameters, and other type specific systems, they have limits in terms of data storage, susceptibility to physical damage, and lack of transparency. These problems highlight the necessity for a more robust and dependable solution. This research suggests using blockchain technology into current FDR systems as a solution to address these constraints. The decentralized and tamper-proof nature of blockchain offers a reliable method for guaranteeing long-term data preservation and improved transparency. The objective is to create a system that can effectively preserve and secure flight data for the entirety of an aircraft's operational life, surpassing the capabilities of existing models. In addition, the suggested solution captures crucial operational data, including pilot identification, passenger count, and other operational characteristics. This guarantees that all data is readily accessible for trend analysis, training improvement, safety enhancements, and complete transparency.


- Uses Sepolia test blockchain.
- A simple UI which interacts with the blockchain to commit and retrieve flight records.
- Uses MetaMask in the backend to approve gas cost prior to commitment.
- Hard constraint for Pilot IDs to respect a specific format.
- Constraint to not accept flight data that is outside of normal and abnormal ranges (eg. Exhaust Gas Temperature 12,000°C or -50°C will be rejected).
- Chronological order for the flight data, with a block timestamp to account for the blockchain's commitment delays.
