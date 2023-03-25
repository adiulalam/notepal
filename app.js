require("dotenv").config();
const express = require("express");
const app = express();
const { expressjwt: jwt } = require("express-jwt");

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.status(200).send("It's Alive!");
});

app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

const userRouter = require("./routes/user.routes.js");
const noteRouter = require("./routes/note.routes.js");

app.use("/users", userRouter);
app.use("/notes", noteRouter);

module.exports = app;
