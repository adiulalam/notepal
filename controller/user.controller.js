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
	// console.log(req.params);
	const { id } = req.params;

	if (_.isNil(id)) {
		return res.status(400).send(JSON.stringify({ message: "ID missing" }));
	}

	if (isNaN(id)) {
		return res.status(400).send(JSON.stringify({ message: "Invalid ID" }));
	}

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
const createByID = (req, res) => {
	const { first_name, last_name, email } = req.body;
	let { password } = req.body;

	if (_.isNil(first_name) || _.isNil(last_name) || _.isNil(email) || _.isNil(password)) {
		return res.status(400).send(JSON.stringify({ message: "Missing Field" }));
	}

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

	if (
		_.isNil(first_name) ||
		_.isNil(last_name) ||
		_.isNil(email) ||
		_.isNil(password) ||
		_.isNil(id)
	) {
		return res.status(400).send(JSON.stringify({ message: "Missing Field" }));
	}

	if (isNaN(id)) {
		return res.status(400).send(JSON.stringify({ message: "Invalid ID" }));
	}

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
	// console.log(req.body);
	const { id } = req.params;

	if (_.isNil(id)) {
		return res.status(400).send(JSON.stringify({ message: "Missing Field" }));
	}

	if (isNaN(id)) {
		return res.status(400).send(JSON.stringify({ message: "Invalid ID" }));
	}

	connection.query("DELETE FROM user WHERE user_id=?", [id], function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

const fetchByIDAndFetchNotes = (req, res) => {
	// console.log(req.params);
	const { id } = req.params;

	if (_.isNil(id)) {
		return res.status(400).send(JSON.stringify({ message: "ID missing" }));
	}

	if (isNaN(id)) {
		return res.status(400).send(JSON.stringify({ message: "Invalid ID" }));
	}

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
	createByID,
	updateByID,
	deleteByID,
	fetchByIDAndFetchNotes,
};
