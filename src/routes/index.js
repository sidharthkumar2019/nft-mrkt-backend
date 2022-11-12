const { Router } = require("express");
const collectionRouter = require("../modules/collection/router");
const itemRouter = require("../modules/item/router");
const userRouter = require("../modules/user/router");

const router = Router();

router.use("/user", userRouter);
router.use("/collection", collectionRouter);
router.use("/item", itemRouter);

module.exports = router;
