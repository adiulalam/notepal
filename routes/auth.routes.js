const express = require("express");
const {
	checkValidLoginData,
	checkUniqueEmail,
	checkValidDataLength,
} = require("../middleware/auth.middleware");
const router = express.Router();
const auth = require("./../controller/auth.controller");
const { checkUserValidData } = require("../middleware/user.middleware");

router.route("/login").post(checkValidLoginData, auth.login);
router
	.route("/register")
	.post(checkUserValidData, checkValidDataLength, checkUniqueEmail, auth.register);

module.exports = router;
