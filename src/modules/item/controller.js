const { messages } = require("../../utils/messages");
const User = require("../../models/user");
const Collection = require("../../models/collection");
const Item = require("../../models/item");

exports.create = async ({ body }) => {
  try {
    const { ownerId, collectionId, name, description, imageLinks } = body;

    console.log({ ownerId, collectionId, name, description, imageLinks });

    const user = await User.findById(ownerId);
    if (!user) {
      return {
        success: false,
        status: 400,
        message: "Something went wrong.",
      };
    }

    let collection = await Collection.findById(collectionId);
    if (!collection || collection.ownerId != ownerId) {
      return {
        success: false,
        status: 400,
        message: "Provide a valid collectionId.",
      };
    }

    // creating an item object
    const itemBody = {
      name,
      description,
      imageLinks,
      collectionId: collection._id,
      ownerId,
    };

    const item = new Item(itemBody);
    await item.save();

    collection.items.push(item.id);
    await collection.save();

    return {
      success: true,
      status: 201,
      message: "Item created successfully.",
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
    const { itemId } = body;

    const item = await Item.findById(itemId);
    if (!item) {
      return {
        success: false,
        status: 400,
        message: "Something went wrong.",
      };
    }

    return {
      success: true,
      status: 200,
      data: item,
      message: "Item fetched successfully.",
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
