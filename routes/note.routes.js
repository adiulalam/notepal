const express = require("express");
const { checkNoteValidData } = require("../middleware/note.middleware");
const { checkIsAdminJWT, checkValidId } = require("../middleware/user.middleware");
const router = express.Router();
const notes = require("../controller/note.controller");
const _ = require("lodash");

router.route("/").get(checkIsAdminJWT, notes.fetchAll).post(checkNoteValidData, notes.createByID);

router.route("/setArchived/:id").put(checkValidId, notes.updateByIDForArchive);

router.route("/setNotArchived/:id").put(checkValidId, notes.updateByIDForNotArchive);

router.route("/isArchived").get(notes.fetchAllIsArchived);

router.route("/isNotArchived").get(notes.fetchAllIsNotArchived);

router
	.route("/:id")
	.get(checkValidId, notes.fetchByID)
	.put(checkValidId, checkNoteValidData, notes.updateByID)
	.delete(checkValidId, notes.deleteByID);

router.route("/:id/user").get(checkValidId, notes.fetchByIDAndFetchUser);

module.exports = router;
