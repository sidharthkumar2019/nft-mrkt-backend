const { Router } = require("express");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const controller = wrapHandlerModule(require("./controller"));
const { create, get } = require("./contract");

const itemRouter = Router();

itemRouter.post("/create", validate(create), controller.create);
itemRouter.post("/get", validate(get), controller.get);

module.exports = itemRouter;
