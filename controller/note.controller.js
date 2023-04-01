const connection = require("../connection");

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
	const { id: JwtID, is_admin } = req.auth;

	let select = "select note_id, note_title, note_description, is_archived";
	let from = "from note";
	let where = "where note_id=?";
	const queryVar = [parseInt(id)];

	if (!is_admin) {
		from += " INNER JOIN user ON user.user_id = note.fk_user_id ";
		where += " AND user_id=? ";
		queryVar.push(JwtID);
	}

	const query = `${select} ${from} ${where}`;

	connection.query(query, queryVar, function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

//Create new note
const createNote = (req, res) => {
	const { note_title, note_description, is_archived } = req.body;
	const { id: fk_user_id } = req.auth;

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
	const { note_title, note_description, is_archived } = req.body;
	const { id: fk_user_id, is_admin } = req.auth;

	let update = "UPDATE note SET note_title=?, note_description=?, is_archived=?";
	let where = "WHERE note_id=?";
	const queryVar = [note_title, note_description, is_archived, parseInt(id)];

	if (!is_admin) {
		where += " AND fk_user_id=? ";
		queryVar.push(fk_user_id);
	}
	const query = `${update} ${where}`;

	connection.query(query, queryVar, function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

//delete note by id
const deleteByID = (req, res) => {
	const { id } = req.params;
	const { id: fk_user_id, is_admin } = req.auth;

	let deleteQuery = "DELETE FROM note";
	let where = "WHERE note_id=?";
	const queryVar = [parseInt(id)];

	if (!is_admin) {
		where += " AND fk_user_id=? ";
		queryVar.push(fk_user_id);
	}
	const query = `${deleteQuery} ${where}`;

	connection.query(query, queryVar, function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

//update note by id for archive
const updateByIDForArchive = (req, res) => {
	const { id } = req.params;
	const { id: fk_user_id, is_admin } = req.auth;

	let update = "UPDATE note SET is_archived=true";
	let where = "WHERE note_id=?";
	const queryVar = [parseInt(id)];

	if (!is_admin) {
		where += " AND fk_user_id=? ";
		queryVar.push(fk_user_id);
	}
	const query = `${update} ${where}`;

	connection.query(query, queryVar, function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

//update note by id for archive
const updateByIDForNotArchive = (req, res) => {
	const { id } = req.params;
	const { id: fk_user_id, is_admin } = req.auth;

	let update = "UPDATE note SET is_archived=false";
	let where = "WHERE note_id=?";
	const queryVar = [parseInt(id)];

	if (!is_admin) {
		where += " AND fk_user_id=? ";
		queryVar.push(fk_user_id);
	}
	const query = `${update} ${where}`;

	connection.query(query, queryVar, function (error, results) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
};

//Get all notes which are archived
const fetchAllIsArchived = (req, res) => {
	connection.query(
		"select note_id, note_title, note_description, is_archived from note where is_archived = true",
		function (error, results) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		}
	);
};

const fetchAllIsNotArchived = (req, res) => {
	connection.query(
		"select note_id, note_title, note_description, is_archived from note where is_archived = false",
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
	createNote,
	updateByID,
	deleteByID,
	updateByIDForArchive,
	updateByIDForNotArchive,
	fetchAllIsArchived,
	fetchAllIsNotArchived,
	fetchByIDAndFetchUser,
};
