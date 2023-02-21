const { Router } = require("express");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const controller = wrapHandlerModule(require("./controller"));
const { create, login, getAllItems, get } = require("./contract");

const userRouter = Router();

userRouter.post("/create", validate(create), controller.create);
userRouter.post("/login", validate(login), controller.login);
userRouter.post("/get", validate(get), controller.get);

userRouter.post("/getAllItems", validate(getAllItems), controller.getAllItems);
userRouter.get("/getAllUsers", controller.getAllUsers);

module.exports = userRouter;
