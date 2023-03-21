const _ = require("lodash");

const checkNoteValidId = (req, res, next) => {
	const { id } = req.params;

	if (_.isNil(id) || isNaN(id)) {
		return res.status(400).send(JSON.stringify({ message: "ID missing / Invalid ID" }));
	} else {
		next();
	}
};

const checkNoteValidData = (req, res, next) => {
	const { note_title, note_description, is_archived, fk_user_id } = req.body;

	if (
		_.isNil(note_title) ||
		_.isNil(note_description) ||
		_.isNil(is_archived) ||
		_.isNil(fk_user_id)
	) {
		return res.status(400).send(JSON.stringify({ message: "Missing Fields" }));
	} else {
		next();
	}
};

module.exports = { checkNoteValidId, checkNoteValidData };
