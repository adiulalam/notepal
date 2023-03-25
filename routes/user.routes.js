const express = require("express");
const {
	checkValidId,
	checkUserValidData,
	checkIsAdminJWT,
} = require("../middleware/user.middleware");
const users = require("./../controller/user.controller");
const router = express.Router();

router.route("/").get(checkIsAdminJWT, users.fetchAll).post(checkUserValidData, users.createUser);

router
	.route("/:id")
	.get(checkValidId, users.fetchByID)
	.put(checkValidId, checkUserValidData, users.updateByID)
	.delete(checkValidId, users.deleteByID);

router.route("/:id/notes").get(checkValidId, users.fetchByIDAndFetchNotes);

module.exports = router;
