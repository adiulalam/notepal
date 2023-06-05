const request = require("supertest");
const app = require("../app");
const { deleteTestEmail } = require("../utils/contMap");
//todo rewrite tests for login and registration

const body = {
	first_name: "adiul",
	last_name: "alam",
	email: "adiulalam+0004@gmail.com",
	password: "Password124",
};

afterAll(async () => await deleteTestEmail(body.email));

describe("Test the path of register and login", () => {
	test("It should response the POST method from creating an user", async () => {
		const response = await request(app).post("/auth/register").send(body);
		expect(response.statusCode).toBe(200);
	});

	test("It should response the POST method from logging the user", async () => {
		const response = await request(app).post("/auth/login").send(body);
		expect(response.statusCode).toBe(200);
	});
});
