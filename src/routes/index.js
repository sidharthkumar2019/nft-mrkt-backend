const { Router } = require("express");
const collectionRouter = require("../modules/collection/router");
const userRouter = require("../modules/user/router");

const router = Router();

router.use("/user", userRouter);
router.use("/collection", collectionRouter);

module.exports = router;
