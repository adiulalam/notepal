const express = require("express");
const { checkValidLoginData, checkUniqueEmail } = require("../middleware/auth.middleware");
const router = express.Router();
const auth = require("./../controller/auth.controller");
const { checkUserValidData } = require("../middleware/user.middleware");

router.route("/login").post(checkValidLoginData, auth.login);
router.route("/register").post(checkUserValidData, checkUniqueEmail, auth.register);

module.exports = router;
