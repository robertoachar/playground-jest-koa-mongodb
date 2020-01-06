import supertest from 'supertest';

import app from '../../../app';
import { connect, disconnect } from '../../../../test/database';
import { generateUser, removeUsers } from '../../../../test/helper';

const server = app.callback();

beforeAll(connect);
afterAll(disconnect);

beforeEach(removeUsers);

describe('User Update', () => {
  test('should update an user', async () => {
    const newUser = generateUser();
    let response = await supertest(server)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const { id, name } = response.body;

    const updatedUser = {
      name: `${name} - UPDATED`
    };
    response = await supertest(server)
      .put(`/users/${id}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(id);
    expect(response.body.name).toBe(updatedUser.name);
  });

  test('should NOT update an user without a name', async () => {
    const newUser = generateUser();
    let response = await supertest(server)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const { id } = response.body;

    const updatedUser = {
      name: ''
    };
    response = await supertest(server)
      .put(`/users/${id}`)
      .send(updatedUser);

    expect(response.status).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "Enter a name",
      }
    `);
  });

  test('should NOT update a duplicate user', async () => {
    let id = null;
    let name = null;

    const newUser1 = generateUser();
    const newUser2 = generateUser();

    let response = await supertest(server)
      .post('/users')
      .send(newUser1);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    id = response.body.id;

    response = await supertest(server)
      .post('/users')
      .send(newUser2);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    name = response.body.name;

    const updatedUser = { name };
    response = await supertest(server)
      .put(`/users/${id}`)
      .send(updatedUser);

    expect(response.status).toBe(422);
    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "message": "User already exists",
      }
    `);
  });
});
