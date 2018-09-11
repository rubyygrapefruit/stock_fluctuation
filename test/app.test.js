const request = require('supertest');
const app = require('../server/app.js').app;
const mongoose = require('../server/app.js').mongoose;

afterAll(() => {
  mongoose.connection.close();
});

describe('Test the root path', () => {
  test(
    'It should response the GET method',
    async done => {
      await request(app)
        .get('/')
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    },
    10000
  );
});

describe('Test restful api', () => {
  test(
    'It should respond with data length equal to 4',
    async () => {
      await request(app)
        .get('/api')
        .then(res => {
          expect(res.body.length).toBe(4);
        });
    },
    10000
  );

  test('It should respond with an array of objects', async () => {
    await request(app)
      .get('/api')
      .then(res => res.body)
      .then(data => {
        expect(Array.isArray(data)).toBe(true);
      }, 10000);
  });
});
