const { Router } = require("express");
const { wrapHandlerModule } = require("../../middlewares/response");
const { validate } = require("../../middlewares/schema");
const { checkApiKey } = require("../../middlewares/auth");
const controller = wrapHandlerModule(require("./controller"));
const { customInputContract } = require("./contract");

const router = Router();

router.post("/", validate(customInputContract), controller.customController);

module.exports = router;
