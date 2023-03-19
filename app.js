const express = require("express");
const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.status(200).send("It's Alive!");
});

const userRouter = require("./routes/user.routes.js");
const noteRouter = require("./routes/note.routes.js");

app.use("/users", userRouter);
app.use("/notes", noteRouter);

module.exports = app;
