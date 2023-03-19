require("dotenv").config();
const mysql = require("mysql");

//start mysql connection
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

// connection.connect(function (err) {
// 	if (err) {
// 		console.log(`Error connecting to Database ${err}`);
// 		return false;
// 	}
// 	console.log("Connected to Database...");
// });

module.exports = connection;
