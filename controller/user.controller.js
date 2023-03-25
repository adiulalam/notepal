const connection = require("./../connection");
const _ = require("lodash");
const CryptoJS = require("crypto-js");

//Get all users
const fetchAll = (req, res) => {
	connection.query(
		"select user_id, first_name, last_name, email from user",
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

const fetchByID = (req, res) => {
	const { id } = req.params;
	connection.query(
		"select user_id, first_name, last_name, email from user where user_id=?",
		[id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//Create new user
const createUser = (req, res) => {
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

//update user by id
const updateByID = (req, res) => {
	const { id } = req.params;
	const { first_name, last_name, email } = req.body;
	let { password } = req.body;
	password = CryptoJS.SHA256(password, process.env.PASSWORD_HASH_SALT).toString();

	connection.query(
		"UPDATE user SET first_name=?, last_name=?, email=?, password=? where user_id=?",
		[first_name, last_name, email, password, id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//delete user by id
const deleteByID = (req, res) => {
	const { id } = req.params;
	connection.query("DELETE FROM user WHERE user_id=?", [id], function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

const fetchByIDAndFetchNotes = (req, res) => {
	const { id } = req.params;
	connection.query(
		"select note.* from user INNER JOIN note ON note.fk_user_id = user.user_id where user_id=?",
		[id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

module.exports = {
	fetchAll,
	fetchByID,
	createUser,
	updateByID,
	deleteByID,
	fetchByIDAndFetchNotes,
};
