const { isCreator } = require("./utils");

const checkCreator = async (req, res, next) => {
  try {
    const { walletAddress } = req.body;
    let success = await isCreator(walletAddress);
    if (success) {
      return next();
    } else {
      res.status(401).send({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Not Authorized",
    });
  }
};

module.exports = {
  checkCreator,
};
