const { messages } = require("../../utils/messages");
const User = require("../../models/user");
const Collections = require("../../models/collection");
const Item = require("../../models/item");

exports.create = async ({ body }) => {
  try {
    const { ownerId, name, description, imageLinks } = body;

    console.log({ ownerId, name, description, imageLinks });

    const user = await User.findById(ownerId);
    if (!user) {
      return {
        success: false,
        status: 400,
        message: "Something went wrong.",
      };
    }

    let collection;
    if (user.collections.length === 0) {
      console.log("No collection found");

      const collectionBody = {
        name: "Default Collection",
        description: "The default collection",
        ownerId: user._id,
      };

      collection = new Collections(collectionBody);
      console.log({ collection });
      await collection.save();

      user.collections.push(collection._id);
      await user.save();
    } else {
      collection = await Collections.findById(user.collections[0]);
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
