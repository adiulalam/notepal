const express = require("express");
const {
	checkValidId,
	checkUserValidData,
	checkIsAdminJWT,
	checkUserIdMatchesOrIsAdmin,
} = require("../middleware/user.middleware");
const users = require("./../controller/user.controller");
const router = express.Router();

router.route("/").get(checkIsAdminJWT, users.fetchAll);

router
	.route("/:id")
	.get(checkValidId, checkUserIdMatchesOrIsAdmin, users.fetchByID)
	.put(checkValidId, checkUserValidData, checkUserIdMatchesOrIsAdmin, users.updateByID)
	.delete(checkValidId, checkUserIdMatchesOrIsAdmin, users.deleteByID);

router
	.route("/:id/notes")
	.get(checkValidId, checkUserIdMatchesOrIsAdmin, users.fetchByIDAndFetchNotes);

module.exports = router;
