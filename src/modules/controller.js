const { messages } = require("../utils/messages");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (res) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email });
    if (user) {
      return {
        status: 400,
        success: false,
        message: messages.auth.reigister.failed,
      };
    }

    const { userName, email, password } = body;
    const hash_password = await bcrypt.hash(password, 10);
    user = new User({
      userName,
      email,
      hash_password,
    });
    user = await user.save();
    if (!user)
      return res.status(400).json({ message: "Something went wrong." });

    const token = generateJWTToken(_id, user.role);
    return {
      status: 201,
      success: true,
      message: messages.auth.reigister.success,
      data: {
        user,
        token,
      },
    };
  } catch (error) {
    console.log(error.message);
  }
};

exports.check = async (res) => {
  const { body, query, headers, params } = res;

  console.log({ body });

  return {
    status: 200,
    success: true,
    message: messages.custom.success,
  };
};
