const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
