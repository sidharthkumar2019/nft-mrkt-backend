const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    contractAddress: {
      type: String,
      required: true,
      trim: true,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
