const _ = require("lodash");

const checkNoteValidData = (req, res, next) => {
	const { note_title, note_description, is_archived } = req.body;

	if (_.isNil(note_title) || _.isNil(note_description) || _.isNil(is_archived)) {
		return res.status(400).send(JSON.stringify({ message: "Missing Fields" }));
	} else {
		next();
	}
};

module.exports = { checkNoteValidData };
