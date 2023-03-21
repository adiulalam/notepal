const express = require("express");
const { checkUserValidId, checkUserValidData } = require("../middleware/user.middleware");
const users = require("./../controller/user.controller");
const router = express.Router();

router.route("/").get(users.fetchAll).post(checkUserValidData, users.createByID);

router
	.route("/:id")
	.get(checkUserValidId, users.fetchByID)
	.put(checkUserValidId, checkUserValidData, users.updateByID)
	.delete(checkUserValidId, users.deleteByID);

router.route("/:id/notes").get(checkUserValidId, users.fetchByIDAndFetchNotes);

module.exports = router;
