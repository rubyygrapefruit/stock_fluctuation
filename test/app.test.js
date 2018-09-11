const request = require("supertest");
const app = require("../server/app.js").app;
const mongoose = require("../server/app.js").mongoose;

afterAll(() => {
  mongoose.connection.close();
});

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test restful api", () => {
  test("It should respond with data length equal to 4", done => {
    request(app)
      .get("/api")
      .then(res => res.body)
      .then(data => {
        expect(data.length).toBe(4);
        done();
      });
  });

  test("It should respond with an array of objects", done => {
    request(app)
      .get("/api")
      .then(res => res.body)
      .then(data => {
        expect(Array.isArray(data)).toBe(true);
        done();
      });
  });
});
