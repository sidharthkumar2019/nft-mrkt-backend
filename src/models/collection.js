const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
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
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
