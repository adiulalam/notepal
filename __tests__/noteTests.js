const request = require("supertest");
const app = require("../app");

describe("Test the root path of note", () => {
	test("It should response the GET method from note path", async () => {
		const response = await request(app).get("/notes");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by if it's archived", () => {
	test("It should response the GET method from note path by archived", async () => {
		const response = await request(app).get("/notes/isArchived");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by if it's NOT archived", () => {
	test("It should response the GET method from note path by NOT archived", async () => {
		const response = await request(app).get("/notes/isNotArchived");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by ID", () => {
	test("It should response the GET method from note path by ID", async () => {
		const response = await request(app).get("/notes/2");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by ID and get the user", () => {
	test("It should response the GET method from note path by ID and get the user", async () => {
		const response = await request(app).get("/notes/2/user");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by creating, updating and deleting an note", () => {
	let lastInsertId = null;
	test("It should response the POST method from creating an note", async () => {
		const body = {
			note_title: "test title",
			note_description: "test description",
			is_archived: false,
			fk_user_id: 6,
		};
		const response = await request(app).post("/notes").send(body);
		lastInsertId = JSON.parse(response.text).insertId || null;
		expect(response.statusCode).toBe(200);
	});

	test("It should response the PUT method from updating an note to archived by ID", async () => {
		if (lastInsertId === null) return false;
		const response = await request(app).put(`/notes/setArchived/${lastInsertId}`);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the PUT method from updating an note to NOT archived by ID", async () => {
		if (lastInsertId === null) return false;
		const response = await request(app).put(`/notes/setNotArchived/${lastInsertId}`);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the PUT method from updating an note", async () => {
		if (lastInsertId === null) return false;

		const body = {
			note_title: "test update",
			note_description: "test description",
			is_archived: true,
			fk_user_id: 6,
		};
		const response = await request(app).put(`/notes/${lastInsertId}`).send(body);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the DELETE method from deleting an note", async () => {
		if (lastInsertId === null) return false;
		const response = await request(app).delete(`/notes/${lastInsertId}`);
		expect(response.statusCode).toBe(200);
	});
});
