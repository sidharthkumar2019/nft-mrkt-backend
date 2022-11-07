const { Router } = require("express");
const { wrapHandlerModule } = require("../middlewares/response");
const { validate } = require("../middlewares/schema");
// const {} = require("../middlewares/auth");
const controller = wrapHandlerModule(require("./controller"));
const { check } = require("./contract");

const router = Router();

router.post("/check", validate(check), controller.check);

module.exports = router;
