const express = require("express");
const router = express.Router();
const users = require("./../controller/user.controller");

router.route("/").get(users.fetchAll).post(users.createByID);

router.route("/:id").get(users.fetchByID).put(users.updateByID).delete(users.deleteByID);

router.route("/:id/notes").get(users.fetchByIDAndFetchNotes);

module.exports = router;
