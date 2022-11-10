const { Router } = require("express");
const userRouter = require("../modules/user/router");

const router = Router();

router.use("/user", userRouter);

module.exports = router;
