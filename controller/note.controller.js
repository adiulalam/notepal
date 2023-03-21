const connection = require("../connection");
const _ = require("lodash");

//Get all notes
const fetchAll = (req, res) => {
	connection.query(
		"select note_id, note_title, note_description, is_archived from note",
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

const fetchByID = (req, res) => {
	const { id } = req.params;
	connection.query(
		"select note_id, note_title, note_description, is_archived from note where note_id=?",
		[id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//Create new note
const createByID = (req, res) => {
	const { note_title, note_description, is_archived, fk_user_id } = req.body;

	connection.query(
		"INSERT INTO note (note_title, note_description, is_archived, fk_user_id) VALUES (?, ?, ?, ?)",
		[note_title, note_description, is_archived, fk_user_id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//update note by id
const updateByID = (req, res) => {
	const { id } = req.params;
	const { note_title, note_description, is_archived, fk_user_id } = req.body;

	connection.query(
		"UPDATE note SET note_title=?, note_description=?, is_archived=?, fk_user_id=? where note_id=?",
		[note_title, note_description, is_archived, fk_user_id, id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//delete note by id
const deleteByID = (req, res) => {
	const { id } = req.params;

	connection.query("DELETE FROM note WHERE note_id=?", [id], function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

//update note by id for archive
const updateByIDForArchive = (req, res) => {
	const { id } = req.params;
	connection.query(
		"UPDATE note SET is_archived=true where note_id=?",
		[id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//update note by id for archive
const updateByIDForNotArchive = (req, res) => {
	const { id } = req.params;
	connection.query(
		"UPDATE note SET is_archived=false where note_id=?",
		[id],
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//Get all notes which are archived
const fetchAllIsArchived = (req, res) => {
	connection.query(
		"select note_id, note_title, note_description, is_archived from note where is_archived = true;",
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

const fetchAllIsNotArchived = (req, res) => {
	connection.query(
		"select note_id, note_title, note_description, is_archived from note where is_archived = false;",
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

//Get user from note id
const fetchByIDAndFetchUser = (req, res) => {
	const { id } = req.params;
	connection.query(
		"SELECT user_id, first_name, last_name, email FROM note INNER JOIN user ON user.user_id = note.fk_user_id where note_id=?",
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
	updateByIDForArchive,
	updateByIDForNotArchive,
	fetchAllIsArchived,
	fetchAllIsNotArchived,
	fetchByIDAndFetchUser,
};
