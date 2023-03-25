const express = require("express");
const { checkValidLoginData } = require("../middleware/auth.middleware");
const router = express.Router();
const auth = require("./../controller/auth.controller");

router.route("/login").post(checkValidLoginData, auth.login);

module.exports = router;
