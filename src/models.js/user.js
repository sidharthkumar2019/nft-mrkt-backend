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
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
    profilePic: {
      type: String,
    },
    walletAddress: {
      type: String,
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
