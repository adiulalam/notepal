const _ = require("lodash");

const checkNoteValidId = (req, res, next) => {
	const { id } = req.params;

	if (_.isNil(id) || isNaN(id)) {
		return res.status(400).send(JSON.stringify({ message: "ID missing / Invalid ID" }));
	} else {
		next();
	}
};

module.exports = { checkNoteValidId };
