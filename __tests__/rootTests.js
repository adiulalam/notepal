const request = require("supertest");
const app = require("../app");
const connection = require("../connection");

describe("Test the root path", () => {
	test("It should response the GET method", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the database connection", () => {
	test("It should connect to the database", (done) => {
		connection.connect(function (err) {
			let result = false;
			if (err) {
				result = false;
				throw err;
			} else {
				result = true;
			}
			expect(result).toBe(true);
		});
		connection.end();
		done();
	});
});
