const _ = require("lodash");
const { checkNoteValidId: checkUserValidId } = require("./note.middleware");

const checkUserValidData = (req, res, next) => {
	const { first_name, last_name, email, password } = req.body;

	if (_.isNil(first_name) || _.isNil(last_name) || _.isNil(email) || _.isNil(password)) {
		return res.status(400).send(JSON.stringify({ message: "Missing Field" }));
	} else {
		next();
	}
};

module.exports = { checkUserValidId, checkUserValidData };
