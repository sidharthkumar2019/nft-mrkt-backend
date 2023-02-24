const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      // required: true,
      default: "Default Username",
      min: 3,
      max: 20,
      trim: true,
    },
    profilePic: {
      type: String,
    },
    backgroundPic: {
      type: String,
    },
    // joiningDate: {   // can be extracted from createdAt property of User
    //   type: Date,
    // },
    description: {
      type: String,
      max: 200,
    },
    socialMedia: [
      {
        platform: String,
        link: String,
      },
    ],
    received: [{ type: String }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
