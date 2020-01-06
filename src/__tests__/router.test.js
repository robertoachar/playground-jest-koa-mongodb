import supertest from 'supertest';

import app from '../app';

const server = app.callback();

describe('Router Tests', () => {
  test('should respond with 200 (/)', async () => {
    const response = await supertest(server).get('/');

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello Playground');
  });

  test('should respond with 404', async () => {
    const response = await supertest(server).get('/not-found');

    expect(response).toBeDefined();
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('text/plain');
  });
});
