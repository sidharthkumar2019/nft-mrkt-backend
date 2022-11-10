const { Router } = require("express");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const controller = wrapHandlerModule(require("./controller"));
const { create, login } = require("./contract");

const userRouter = Router();

userRouter.post("/create", validate(create), controller.create);
userRouter.post("/login", validate(login), controller.login);

module.exports = userRouter;
