const { ethers } = require("ethers");

const url =
  "https://polygon-mumbai.g.alchemy.com/v2/iZDtkSlQWHXN8af_yP2u2RuhBDrKzoDH";
const address = "0xc7154e0be18b4449a91f9897a8a3e8816d5be487";
const abi = [
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
    inputs: [
      {
        internalType: "address",
        name: "_add",
        type: "address",
      },
    ],
    name: "add_whitelister",
    outputs: [],
    stateMutability: "nonpayable",
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
