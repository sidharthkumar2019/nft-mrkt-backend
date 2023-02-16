const checkCreator = (req, res, next) => {
  try {
    const { walletAddress } = req.body;
    let success = 1;
    //
    // add some verification code here
    //
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
