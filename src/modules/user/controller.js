const { messages } = require("../../utils/messages");
const User = require("../../models/user");
const Collection = require("../../models/collection");

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

exports.getAllItems = async ({ body }) => {
  try {
    const { userId } = body;

    let user = await User.findById(userId);
    if (!user) {
      return {
        success: true,
        status: 400,
        message: "No such user.",
      };
    }

    const collections = await Promise.all(
      user.collections.map((id) => Collection.findById(id).populate("items"))
    );

    return {
      success: true,
      status: 200,
      data: { user, collections },
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

exports.getAllUsers = async ({ body }) => {
  try {
    let users = await User.find({});
    if (!users) {
      return {
        success: true,
        status: 400,
        message: "Some error occurred.",
      };
    }

    for (const user of users) {
      const collections = await Promise.all(
        user.collections.map((id) => Collection.findById(id).populate("items"))
      );
      user.collections = collections;
    }

    return {
      success: true,
      status: 200,
      data: { users },
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
exports.getUserByAddress = (address) =>
  User.findOne({ walletAddress: address });
