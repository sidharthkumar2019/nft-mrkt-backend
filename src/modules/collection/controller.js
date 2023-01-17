const Collection = require("../../models/collection");
const { messages } = require("../../utils/messages");
const { getUserById } = require("../user/controller");

exports.create = async ({ body }) => {
  try {
    const { name, description, ownerId } = body;
    const user = await getUserById(ownerId);
    if (!user) {
      return {
        success: true,
        status: 400,
        message: "No user corresponds to the ownerId.",
      };
    }

    const collection = new Collection({
      name,
      description,
      ownerId,
    });
    await collection.save();

    console.log({ collection });
    user.collections.push(collection._id);
    await user.save();

    return {
      success: true,
      status: 201,
      message: "Collection created successfully.",
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

exports.getAll = async ({ body }) => {
  try {
    const { ownerId } = body;
    const user = await getUserById(ownerId);
    if (!user) {
      return {
        success: true,
        status: 400,
        message: "No user corresponds to the ownerId.",
      };
    }

    const collections = await Promise.all(
      user.collections.map((id) => Collection.findById(id))
    );

    return {
      success: true,
      status: 200,
      data: collections,
      message: "Collections fetched successfully.",
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
