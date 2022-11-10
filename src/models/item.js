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
      required: true,
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
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
