const Item = require("../../models/item");
const { getCollectionByAddress } = require("../collection/controller");
const { getUserByAddress } = require("../user/controller");

exports.getById = (id) => Item.findOne({ _id: id });

exports.create = async ({ body }) => {
  try {
    const {
      address,
      contractAddress,
      name,
      description,
      imageLinks,
      tokenId,
      finalUrl,
    } = body;
    const user = await getUserByAddress(address);
    if (!user) {
      return {
        success: false,
        status: 400,
        message: "Something went wrong.",
      };
    }

    let collection = await getCollectionByAddress(contractAddress);
    if (!collection) {
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
      contractAddress,
      ownerAddress: address,
      tokenId,
      finalUrl,
    };

    const item = new Item(itemBody);
    await item.save();

    collection.items.push(item.id);
    await collection.save();

    return {
      success: true,
      status: 201,
      message: "Item created successfully.",
      data: item,
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

exports.growth = async () => {
  try {
    let data = await Item.aggregate([
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
