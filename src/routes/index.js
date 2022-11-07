const { Router } = require("express");

const router = Router();

const routes = require("../modules/router");

router.use("/", routes);

module.exports = router;
