const _ = require("lodash");

const checkValidId = (req, res, next) => {
	const { id } = req.params;

	if (_.isNil(id) || isNaN(id)) {
		return res.status(400).send(JSON.stringify({ message: "ID missing / Invalid ID" }));
	} else {
		next();
	}
};

const checkUserValidData = (req, res, next) => {
	const { first_name, last_name, email, password } = req.body;

	if (_.isNil(first_name) || _.isNil(last_name) || _.isNil(email) || _.isNil(password)) {
		return res.status(400).send(JSON.stringify({ message: "Missing Field" }));
	} else {
		next();
	}
};

const checkIsAdminJWT = (req, res, next) => {
	if (!req.auth.admin) {
		return res.sendStatus(401).send(JSON.stringify({ message: "Unauthorized user" }));
	} else {
		next();
	}
};

module.exports = { checkValidId, checkUserValidData, checkIsAdminJWT };
