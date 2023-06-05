const jwt = require("jsonwebtoken");
const connection = require("../connection");

const adminHeader = {
	Authorization: `Bearer ${jwt.sign(
		{
			id: 36,
			email: "adiulalam@gmail.com",
			is_admin: true,
		},
		process.env.JWT_SECRET,
		{ algorithm: "HS256", expiresIn: "24h" }
	)}`,
};

const deleteTestEmail = (email) => {
	return new Promise((resolve, reject) => {
		if (!email) reject("No email provided");
		connection.query("DELETE FROM user WHERE email=?", [email], function (error, results) {
			if (error) reject(error);

			resolve(results);
		});
	});
};
module.exports = { adminHeader, deleteTestEmail };
