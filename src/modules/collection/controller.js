const Collection = require("../../models/collection");
const { messages } = require("../../utils/messages");
const { getUserById, getUserByAddress } = require("../user/controller");

exports.create = async ({ body }) => {
  try {
    const { name, description, address, contractAddress } = body;
    const user = await getUserByAddress(address);
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
      ownerId: user._id,
      contractAddress,
    });
    await collection.save();

    user.collections.push(collection._id);
    await user.save();

    return {
      success: true,
      status: 201,
      message: "Collection created successfully.",
      data: collection,
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
    const { collectionId } = body;

    const collection = await Collection.findById(collectionId).populate(
      "items"
    );

    return {
      success: true,
      status: 200,
      data: collection,
      message: "Collection fetched successfully.",
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
    const { address } = body;
    const user = await getUserByAddress(address);
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

exports.getByAddress = async ({ body }) => {
  try {
    const { address } = body;
    const collection = await Collection.findOne({
      contractAddress: address,
    }).populate("items");

    return {
      success: true,
      status: 200,
      data: collection,
      message: "Collection fetched successfully.",
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

exports.getCollectionByAddress = (address) =>
  Collection.findOne({
    contractAddress: address,
  });
