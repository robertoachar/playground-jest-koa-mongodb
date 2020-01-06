import supertest from 'supertest';

import app from '../../../app';
import { connect, disconnect } from '../../../../test/database';
import { generateUser, removeUsers } from '../../../../test/helper';

const server = app.callback();

beforeAll(connect);
afterAll(disconnect);

beforeEach(removeUsers);

describe('User Remove', () => {
  test('should remove an user', async () => {
    const user = generateUser();
    let response = await supertest(server)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();

    const { id } = response.body;
    response = await supertest(server).delete(`/users/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(id);

    response = await supertest(server).delete(`/users/${id}`);
    expect(response.status).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "User not found",
      }
    `);
  });

  test('should NOT remove an user with an invalid id', async () => {
    const response = await supertest(server).delete('/users/0');

    expect(response.status).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "Invalid id",
      }
    `);
  });

  test('should NOT remove an user with an absent id', async () => {
    const response = await supertest(server).delete(
      '/users/5e0fbc16bb07f6875ff493e5'
    );

    expect(response.status).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "User not found",
      }
    `);
  });
});
