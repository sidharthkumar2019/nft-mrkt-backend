const { Router } = require("express");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const controller = wrapHandlerModule(require("./controller"));
const { create } = require("./contract");

const itemRouter = Router();

itemRouter.post("/create", validate(create), controller.create);

module.exports = itemRouter;
