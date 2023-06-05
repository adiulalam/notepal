const request = require("supertest");
const app = require("../app");
const { adminHeader } = require("../utils/contMap");

describe("Test the root path of note", () => {
	test("It should response the GET method from note path", async () => {
		const response = await request(app).get("/notes").set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by if it's archived", () => {
	test("It should response the GET method from note path by archived", async () => {
		const response = await request(app).get("/notes/isArchived").set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by if it's NOT archived", () => {
	test("It should response the GET method from note path by NOT archived", async () => {
		const response = await request(app).get("/notes/isNotArchived").set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by ID", () => {
	test("It should response the GET method from note path by ID", async () => {
		const response = await request(app).get("/notes/2").set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the path of note by ID and get the user", () => {
	test("It should response the GET method from note path by ID and get the user", async () => {
		const response = await request(app).get("/notes/2/user").set(adminHeader);
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
		const response = await request(app).post("/notes").send(body).set(adminHeader);
		lastInsertId = JSON.parse(response.text).insertId || null;
		expect(response.statusCode).toBe(200);
	});

	test("It should response the PUT method from updating an note to archived by ID", async () => {
		if (lastInsertId === null) throw new Error("No lastInsertId found");

		const response = await request(app)
			.put(`/notes/setArchived/${lastInsertId}`)
			.set(adminHeader);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the PUT method from updating an note to NOT archived by ID", async () => {
		if (lastInsertId === null) throw new Error("No lastInsertId found");
		const response = await request(app)
			.put(`/notes/setNotArchived/${lastInsertId}`)
			.set(adminHeader);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the PUT method from updating an note", async () => {
		if (lastInsertId === null) throw new Error("No lastInsertId found");

		const body = {
			note_title: "test update",
			note_description: "test description",
			is_archived: true,
			fk_user_id: 6,
		};
		const response = await request(app)
			.put(`/notes/${lastInsertId}`)
			.send(body)
			.set(adminHeader);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the DELETE method from deleting an note", async () => {
		if (lastInsertId === null) throw new Error("No lastInsertId found");
		const response = await request(app).delete(`/notes/${lastInsertId}`).set(adminHeader);
		expect(response.statusCode).toBe(200);
	});
});
