const { isCreator } = require("./utils");

const checkCreator = async (req, res, next) => {
  try {
    const { address } = req.body;
    let success = await isCreator(address);
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
