const request = require("supertest");
const app = require("../app");
const { adminHeader, deleteTestEmail } = require("../utils/contMap");

const body = {
	first_name: "adiul",
	last_name: "alam",
	email: "adiulalam+0002@gmail.com",
	password: "Password124",
};

afterAll(async () => await deleteTestEmail(body.email));

describe("Test the root path of user", () => {
	test("It should response the GET method from user path", async () => {
		const response = await request(app).get("/users").set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of user by ID", () => {
	test("It should response the GET method from user path by ID", async () => {
		const response = await request(app).get("/users/6").set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of user by ID and get all notes", () => {
	test("It should response the GET method from user path by ID and get all notes", async () => {
		const response = await request(app).get("/users/6/notes").set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of user by creating, updating and deleting an user", () => {
	let lastInsertId = null;

	test("Test the lastInsertId", async () => {
		const response = await request(app).post("/auth/register").send(body);
		expect(response.statusCode).toBe(200);
		lastInsertId = JSON.parse(response.text).insertId || null;
	});

	test("It should response the PUT method from updating an user", async () => {
		if (lastInsertId === null) throw new Error("No lastInsertId found");

		body["first_name"] = "John";
		body["last_name"] = "Doe";
		body["email"] = "adiulalam+0200@gmail.com";
		body["password"] = "NewPassword124";

		const response = await request(app)
			.put(`/users/${lastInsertId}`)
			.send(body)
			.set(adminHeader);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the DELETE method from deleting an user", async () => {
		if (lastInsertId === null) throw new Error("No lastInsertId found");
		const response = await request(app).delete(`/users/${lastInsertId}`).set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});
