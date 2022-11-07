const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      loadClass: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    backgroundPic: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    joiningDate: {
      type: Date,
    },
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
    dashboard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dashboard",
    },
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(() => `${this.firstName} ${this.lastName}`);

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
