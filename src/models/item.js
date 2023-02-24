const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      trim: true,
    },
    description: {
      type: String,
      default: "na",
      trim: true,
    },
    imageLinks: [{ type: String, trim: true }],
    traits: {
      shape: {
        type: String,
      },
      size: {
        type: String,
      },
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    tokenId: { type: String, required: true },
    finalUrl: { type: String, required: true },
    price: {
      type: Number,
      default: 100,
      // required: true,
    },
    bids: [
      {
        type: String,
      },
    ],
    onSale: {
      type: Boolean,
      default: false,
    },
    history: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);

/*
    
    Sales history (it will contain some strings, will update later)

*/
