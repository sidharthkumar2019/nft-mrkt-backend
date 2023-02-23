const { Router } = require("express");
const { checkCreator } = require("../../middlewares/auth");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const controller = wrapHandlerModule(require("./controller"));
const { create, get } = require("./contract");

const itemRouter = Router();

itemRouter.post("/create", validate(create), checkCreator, controller.create);
itemRouter.post("/get", validate(get), controller.get);

itemRouter.get("/growth", controller.growth);

module.exports = itemRouter;
