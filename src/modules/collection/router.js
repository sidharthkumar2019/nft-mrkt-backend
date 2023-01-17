const { Router } = require("express");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const controller = wrapHandlerModule(require("./controller"));
const { create } = require("./contract");
const { getAll } = require("./contract");

const collectionRouter = Router();

collectionRouter.post("/create", validate(create), controller.create);
collectionRouter.post("/getAll", validate(getAll), controller.getAll);

module.exports = collectionRouter;
