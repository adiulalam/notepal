const express = require("express");
const { checkNoteValidId } = require("../middleware/note.middleware");
const router = express.Router();
const notes = require("../controller/note.controller");

router.route("/").get(notes.fetchAll).post(notes.createByID);

router.route("/setArchived/:id").put(checkNoteValidId, notes.updateByIDForArchive);

router.route("/setNotArchived/:id").put(checkNoteValidId, notes.updateByIDForNotArchive);

router.route("/isArchived").get(notes.fetchAllIsArchived);

router.route("/isNotArchived").get(notes.fetchAllIsNotArchived);

router
	.route("/:id")
	.get(checkNoteValidId, notes.fetchByID)
	.put(checkNoteValidId, notes.updateByID)
	.delete(checkNoteValidId, notes.deleteByID);

router.route("/:id/user").get(checkNoteValidId, notes.fetchByIDAndFetchUser);

module.exports = router;
