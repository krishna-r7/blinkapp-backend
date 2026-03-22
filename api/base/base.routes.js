const express = require("express");
const { BaseController} = require("../base/base.controller");
const router = express.Router();

const baseController = new BaseController();

router.post("/askAi", baseController.askAi);
router.post("/savePrompt", baseController.savePrompt);


module.exports = router;