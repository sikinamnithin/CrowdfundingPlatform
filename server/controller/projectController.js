const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
  // Add the ABI of your smart contract here
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

exports.createProject = async (req, res) => {
  try {
    const { title, milestoneDescriptions, milestoneAmounts } = req.body;
    const tx = await contract.createProject(
      title,
      milestoneDescriptions,
      milestoneAmounts
    );
    await tx.wait();
    res
      .status(201)
      .send({
        message: "Project created successfully!",
        transactionHash: tx.hash,
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.contribute = async (req, res) => {
  try {
    const { projectId, amount } = req.body;
    const tx = await contract.contribute(projectId, {
      value: ethers.parseEther(amount.toString()),
    });
    await tx.wait();
    res
      .status(200)
      .send({ message: "Contribution successful!", transactionHash: tx.hash });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.voteOnMilestone = async (req, res) => {
  try {
    const { projectId, milestoneId, approve } = req.body;
    const tx = await contract.voteOnMilestone(projectId, milestoneId, approve);
    await tx.wait();
    res
      .status(200)
      .send({ message: "Vote successful!", transactionHash: tx.hash });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectDetails = await contract.getProjectDetails(projectId);
    res.status(200).send({ projectDetails });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
