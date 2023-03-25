const express = require("express");
const { checkValidId, checkUserValidData } = require("../middleware/user.middleware");
const users = require("./../controller/user.controller");
const router = express.Router();

router.route("/").get(users.fetchAll).post(checkUserValidData, users.createByID);

router
	.route("/:id")
	.get(checkValidId, users.fetchByID)
	.put(checkValidId, checkUserValidData, users.updateByID)
	.delete(checkValidId, users.deleteByID);

router.route("/:id/notes").get(checkValidId, users.fetchByIDAndFetchNotes);

module.exports = router;
