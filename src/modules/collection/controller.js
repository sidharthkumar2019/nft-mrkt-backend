const Collection = require("../../models/collection");
const { messages } = require("../../utils/messages");

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
    user.collections.append(collection._id);
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
