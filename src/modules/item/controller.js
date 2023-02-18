const Item = require("../../models/item");
const { getCollectionByAddress } = require("../collection/controller");
const { getUserByAddress } = require("../user/controller");

exports.create = async ({ body }) => {
  try {
    const { address, contractAddress, name, description, imageLinks } = body;
    const user = await getUserByAddress(address);
    if (!user) {
      return {
        success: false,
        status: 400,
        message: "Something went wrong.",
      };
    }

    let collection = await getCollectionByAddress(contractAddress);
    if (!collection || collection.ownerId != user._id) {
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
      ownerId: user._id,
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
