const { ethers } = require("ethers");

const url =
  "https://polygon-mumbai.g.alchemy.com/v2/iZDtkSlQWHXN8af_yP2u2RuhBDrKzoDH";
const address = "0x2CE27d197722108333F4De0Cd3E891aDcCbA1409";
const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "add_whitelister",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "IsWhitelister",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const isCreator = async (walletAddress) => {
  const provider = new ethers.JsonRpcProvider(url);
  const contract = new ethers.Contract(address, abi, provider);
  const res = await contract.IsWhitelister(walletAddress);
  console.log(res);
  return res;
};

module.exports = {
  isCreator,
};
