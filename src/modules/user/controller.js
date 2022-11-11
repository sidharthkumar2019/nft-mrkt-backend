const { messages } = require("../../utils/messages");
const User = require("../../models/user");

exports.create = async ({ body }) => {
  try {
    const { address, username } = body;
    const user = new User({
      userName: username,
      walletAddress: address,
    });

    await user.save();
    console.log({ user });

    return {
      success: true,
      status: 201,
      message: "User created successfully.",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      status: 500,
      message: "Something went wrong.",
    };
  }
};

exports.login = async ({ body }) => {
  try {
    const { address } = body;

    let user = await User.findOne({ walletAddress: address });
    if (!user) {
      user = new User({
        walletAddress: address,
      });

      await user.save();

      return {
        success: true,
        status: 200,
        data: { user },
        message: "User created successfully.",
      };
    }

    return {
      success: true,
      status: 200,
      data: { user },
      message: "Success.",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      status: 500,
      message: "Something went wrong.",
    };
  }
};

exports.getUserById = (id) => User.findOne({ _id: id });
