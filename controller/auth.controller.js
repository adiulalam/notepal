require("dotenv").config();
const connection = require("./../connection");
const _ = require("lodash");
const CryptoJS = require("crypto-js");
const { createJWT } = require("../middleware/auth.middleware");

const login = (req, res) => {
	const { email } = req.body;
	let { password } = req.body;
	password = CryptoJS.SHA256(password, process.env.PASSWORD_HASH_SALT).toString();

	connection.query(
		"select count(*) as count from user where email=? AND password=?",
		[email, password],
		async function (error, results) {
			if (error) throw error;
			const count = _.get(results, "0.count", 0) || 0;

			if (count > 0) {
				const JWTToken = await createJWT(email, password);
				return res.end(JSON.stringify(JWTToken));
			} else {
				return res.status(400).send(JSON.stringify({ message: "No Email/Password found" }));
			}
		}
	);
};

const register = (req, res) => {
	const { first_name, last_name, email } = req.body;
	let { password } = req.body;
	password = CryptoJS.SHA256(password, process.env.PASSWORD_HASH_SALT).toString();

	connection.query(
		"INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
		[first_name, last_name, email, password],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

module.exports = {
	login,
	register,
};
