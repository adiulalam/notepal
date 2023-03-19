const express = require("express");
const router = express.Router();
const notes = require("../controller/note.controller");

router.route("/").get(notes.fetchAll).post(notes.createByID);

router.route("/setArchived/:id").put(notes.updateByIDForArchive);

router.route("/setNotArchived/:id").put(notes.updateByIDForNotArchive);

router.route("/isArchived").get(notes.fetchAllIsArchived);

router.route("/isNotArchived").get(notes.fetchAllIsNotArchived);

router.route("/:id").get(notes.fetchByID).put(notes.updateByID).delete(notes.deleteByID);

router.route("/:id/user").get(notes.fetchByIDAndFetchUser);

module.exports = router;
