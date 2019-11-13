import request from 'supertest';

import app from '../src/app';
import config from '../src/config';

let server = null;

beforeEach(() => {
  server = app.listen(config.PORT);
});

afterEach(() => {
  server.close();
});

describe('Basic Tests', () => {
  test('should respond with 200 (GET)', async () => {
    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Hello Playground');
  });

  test('should respond with 404', async () => {
    const response = await request(server).get('/not-found');

    expect(response.status).toEqual(404);
    expect(response.type).toEqual('text/plain');
  });
});
