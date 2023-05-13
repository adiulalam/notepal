const request = require("supertest");
const app = require("../app");

//todo rewrite tests for login and registration 
describe("Test the root path of user", () => {
	test("It should response the GET method from user path", async () => {
		const response = await request(app).get("/users");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of user by ID", () => {
	test("It should response the GET method from user path by ID", async () => {
		const response = await request(app).get("/users/6");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of user by ID and get all notes", () => {
	test("It should response the GET method from user path by ID and get all notes", async () => {
		const response = await request(app).get("/users/6/notes");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of user by creating, updating and deleting an user", () => {
	let lastInsertId = null;
	test("It should response the POST method from creating an user", async () => {
		const insertBody = {
			first_name: "adiul",
			last_name: "alam",
			email: "adiulalam@gmail.com",
			password: "password124",
		};
		const response = await request(app).post("/users").send(insertBody);
		lastInsertId = JSON.parse(response.text).insertId || null;
		expect(response.statusCode).toBe(200);
	});

	test("It should response the PUT method from updating an user", async () => {
		if (lastInsertId === null) return false;

		const body = {
			first_name: "John",
			last_name: "Doe",
			email: "johndoe@gmail.com",
			password: "password124",
		};
		const response = await request(app).put(`/users/${lastInsertId}`).send(body);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the DELETE method from deleting an user", async () => {
		if (lastInsertId === null) return false;
		const response = await request(app).delete(`/users/${lastInsertId}`);
		expect(response.statusCode).toBe(200);
	});
});
