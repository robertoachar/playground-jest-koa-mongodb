import supertest from 'supertest';

import app from '../app';
import { connect, disconnect } from '../database';

const server = app.callback();

beforeAll(connect);
afterAll(disconnect);

describe('Healthz Tests OK', () => {
  test('should respond with 200 (/healthz)', async () => {
    const response = await supertest(server).get('/healthz');

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/plain');
  });
});
