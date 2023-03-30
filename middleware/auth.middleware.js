require("dotenv").config();
const connection = require("./../connection");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const checkValidLoginData = (req, res, next) => {
	const { email, password } = req.body;

	if (_.isNil(email) || _.isNil(password)) {
		return res.status(400).send(JSON.stringify({ message: "Missing Fields" }));
	} else {
		next();
	}
};

const checkUniqueEmail = (req, res, next) => {
	const { email } = req.body;

	connection.query(
		"select count(*) as count from user where email=?",
		[email],
		function (error, results) {
			if (error) throw error;
			const count = _.get(results, "0.count", 0) || 0;

			if (count > 0) {
				return res.status(400).send(JSON.stringify({ message: "Email already exists" }));
			} else {
				return next();
			}
		}
	);
};

const createJWT = (email, password) => {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT user_id, email, is_admin FROM user where email=? AND password=? limit 1",
			[email, password],
			function (error, results) {
				if (error) reject(error);

				const id = _.get(results, "0.user_id", null) || null;
				const email = _.get(results, "0.email", null) || null;
				const is_admin = _.get(results, "0.is_admin", false) || false;

				if (!id || !email) reject(new Error("No id or email").then(resolved, rejected));

				const token = jwt.sign(
					{
						id: id,
						email: email,
						is_admin: is_admin,
					},
					process.env.JWT_SECRET,
					{ algorithm: "HS256", expiresIn: "24h" }
				);

				resolve({ token: token });
			}
		);
	});
};

module.exports = {
	checkValidLoginData,
	createJWT,
	checkUniqueEmail,
};
