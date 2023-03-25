require("dotenv").config();
const express = require("express");
const app = express();
const { expressjwt: jwt } = require("express-jwt");
const userRouter = require("./routes/user.routes.js");
const noteRouter = require("./routes/note.routes.js");
const authRouter = require("./routes/auth.routes.js");

const checkJWT = jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.status(200).send("It's Alive!");
});
app.use("/auth", authRouter);

app.use("/users", checkJWT, userRouter);
app.use("/notes", checkJWT, noteRouter);

module.exports = app;
