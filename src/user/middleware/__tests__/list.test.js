import supertest from 'supertest';

import app from '../../../app';
import { connect, disconnect } from '../../../../test/database';
import { generateUser, removeUsers } from '../../../../test/helper';

const server = app.callback();

beforeAll(connect);
afterAll(disconnect);

beforeEach(removeUsers);

describe('User List', () => {
  test('should return an empty list of users', async () => {
    const response = await supertest(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  test('should return a list of users', async () => {
    const newUser = generateUser();
    let response = await supertest(server)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();

    const { id } = response.body;

    response = await supertest(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(id);
  });
});
