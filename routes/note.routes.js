const express = require("express");
const { checkNoteValidId, checkNoteValidData } = require("../middleware/note.middleware");
const router = express.Router();
const notes = require("../controller/note.controller");

router.route("/").get(notes.fetchAll).post(checkNoteValidData, notes.createByID);

router.route("/setArchived/:id").put(checkNoteValidId, notes.updateByIDForArchive);

router.route("/setNotArchived/:id").put(checkNoteValidId, notes.updateByIDForNotArchive);

router.route("/isArchived").get(notes.fetchAllIsArchived);

router.route("/isNotArchived").get(notes.fetchAllIsNotArchived);

router
	.route("/:id")
	.get(checkNoteValidId, notes.fetchByID)
	.put(checkNoteValidId, checkNoteValidData, notes.updateByID)
	.delete(checkNoteValidId, notes.deleteByID);

router.route("/:id/user").get(checkNoteValidId, notes.fetchByIDAndFetchUser);

module.exports = router;
