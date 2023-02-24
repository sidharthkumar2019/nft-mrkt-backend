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

exports.edit = async ({ body }) => {
  try {
    const { userId, userName, profilePic, backgroundPic } = body;

    const filter = { _id: userId };
    const update = { $set: { userName, profilePic, backgroundPic } };
    const res = await User.updateOne(filter, update);
    console.log(res);

    return {
      success: true,
      status: 201,
      message: "User updated successfully.",
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

exports.get = async ({ body }) => {
  try {
    const { address } = body;
    let user = await this.getUserByAddress(address);
    return {
      success: true,
      status: 200,
      data: { user },
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

exports.getReceived = async ({ body }) => {
  try {
    const { userId } = body;
    let user = await this.getUserById(userId);
    if (!user) {
      return {
        success: true,
        status: 400,
        messages: "User not found",
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      status: 500,
      message: "Something went wrong.",
    };
  }
};

exports.receive = async ({ body }) => {
  try {
    const { userAddress, itemId } = body;
    const filter = { walletAddress: userAddress };
    const update = { $push: { received: itemId } };

    const res = await User.updateOne(filter, update);
    return {
      success: true,
      status: 200,
      data: { res },
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

exports.getById = async ({ body }) => {
  try {
    const { userId } = body;
    let user = await this.getUserById(userId);
    return {
      success: true,
      status: 200,
      data: { user },
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

exports.growth = async () => {
  try {
    let data = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              date: "$_id",
              count: "$count",
            },
          },
        },
      },
      {
        $unwind: "$data",
      },
      {
        $group: {
          _id: "$data.date",
          count: { $sum: "$data.count" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return {
      success: true,
      status: 200,
      data: { data },
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
