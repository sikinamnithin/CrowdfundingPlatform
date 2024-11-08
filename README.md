# Sustainable Crowdfunding Platform

This is a decentralized crowdfunding platform on Ethereum with milestone-based funding and community voting. Contributors can fund projects, vote on milestones, and track progress—all secured on the blockchain.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed
- **MetaMask** browser extension for Ethereum transactions
- **Infura** account (or other provider) for Ethereum node access

### Smart Contract Deployment

First, deploy the smart contract:

1. Navigate to the `/smart-contract` directory.
2. Compile and deploy `CrowdfundingPlatform.sol` to a test network (Rinkeby or Goerli).
3. Note the **contract address** and **ABI**.

### Backend Setup (Node.js)

1. Go to the `/server` directory.
2. Create a `.env` file:

    ```plaintext
    INFURA_URL=<your-infura-url>
    PRIVATE_KEY=<your-wallet-private-key>
    CONTRACT_ADDRESS=<deployed-contract-address>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the backend server:

    ```bash
    npm run dev
    ```

The server will be available at [http://localhost:5000](http://localhost:5000).

### Frontend Setup (React)

1. Go to the `/client` directory.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the React application:

    ```bash
    npm start
    ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Using the Platform

### Create a Project

1. Go to **Create Project** in the app.
2. Enter project title and milestones (with descriptions and ETH amounts).
3. Submit to create the project on the blockchain.

### Contribute to a Project

1. Go to **Contribute** in the app.
2. Enter the project ID and the amount to contribute.
3. Confirm the transaction in MetaMask.

### Vote on a Milestone

1. Go to **Vote on Milestone** in the app.
2. Enter project ID, milestone ID, and vote (approve/reject).
3. Confirm in MetaMask to submit your vote.

### View Project Details

1. Go to **Get Project Details** in the app.
2. Enter the project ID to see project details, funding status, and milestones.

## Learn More

To learn more about the technologies used in this project:

- [Ethereum Documentation](https://ethereum.org/developers/) - Learn about smart contracts and blockchain development.
- [Ethers.js Documentation](https://docs.ethers.io/) - Official docs for interacting with the Ethereum blockchain.
- [React Documentation](https://reactjs.org/docs/getting-started.html) - Learn about building user interfaces with React.

## Future Improvements

- **Notifications**: Notify users on milestone updates.
- **Advanced Voting**: Implement weighted voting or quadratic voting.
- **Analytics**: Visualize funding and voting data.


