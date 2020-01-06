import supertest from 'supertest';

import app from '../../../app';
import { connect, disconnect } from '../../../../test/database';
import { generateUser, removeUsers } from '../../../../test/helper';

const server = app.callback();

beforeAll(connect);
afterAll(disconnect);

beforeEach(removeUsers);

describe('User Create', () => {
  test('should create a new user', async () => {
    const user = generateUser();
    const response = await supertest(server)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: expect.any(String)
    });
  });

  test('should NOT create a new user without a name', async () => {
    const newUser = generateUser({ name: '' });
    const response = await supertest(server)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "Enter a name",
      }
    `);
  });

  test('should NOT create a duplicate user', async () => {
    const newUser1 = generateUser({ name: 'Roberto Achar' });
    const newUser2 = generateUser({ name: 'Roberto Achar' });

    let response = await supertest(server)
      .post('/users')
      .send(newUser1);

    expect(response.status).toBe(200);

    response = await supertest(server)
      .post('/users')
      .send(newUser2);

    expect(response.status).toEqual(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "User already exists",
      }
    `);
  });
});
