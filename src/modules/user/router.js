const { Router } = require("express");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const controller = wrapHandlerModule(require("./controller"));
const {
  create,
  login,
  getAllItems,
  get,
  getById,
  receive,
  getReceived,
} = require("./contract");

const userRouter = Router();

userRouter.post("/create", validate(create), controller.create);
userRouter.post("/login", validate(login), controller.login);
userRouter.post("/get", validate(get), controller.get);
userRouter.post("/getById", validate(getById), controller.getById);
userRouter.post("/getAllItems", validate(getAllItems), controller.getAllItems);
userRouter.post("/edit", controller.edit);
userRouter.post("/receive", validate(receive), controller.receive);
// userRouter.post("/getReceived", validate(getReceived), controller.getReceived);

userRouter.get("/getAllUsers", controller.getAllUsers);
userRouter.get("/growth", controller.growth);

module.exports = userRouter;
