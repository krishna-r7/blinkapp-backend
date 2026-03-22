const express = require("express");
const baseRoutes = require("./base/base.routes");

const router = express.Router();

router.use("/ai", baseRoutes);



module.exports = router;