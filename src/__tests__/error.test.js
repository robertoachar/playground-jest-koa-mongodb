import errorMiddleware from '../error';
import { UnauthorizedError, UnknownError } from '../../test/errors';

describe('Error Middleware Tests', () => {
  test('should bypass', async () => {
    const ctx = {};
    const next = jest.fn(() => Promise.resolve(true));

    await errorMiddleware(ctx, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.results[0].value).resolves.toBe(true);
  });

  test('should return 422', async () => {
    const status = 422;
    const error = new Error('Error');
    const ctx = {};
    const next = jest.fn(() => Promise.reject(error));

    await errorMiddleware(ctx, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.results[0].value).rejects.toBe(error);
    expect(ctx.status).toBe(status);
    expect(ctx.body).toMatchInlineSnapshot(`
      Object {
        "message": "Error",
      }
    `);
  });

  test('should return 401', async () => {
    const status = 401;
    const error = new UnauthorizedError('Error');
    const ctx = {};
    const next = jest.fn(() => Promise.reject(error));

    await errorMiddleware(ctx, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.results[0].value).rejects.toBe(error);
    expect(ctx.status).toBe(status);
    expect(ctx.body).toMatchInlineSnapshot(`
      Object {
        "message": "Error",
      }
    `);
  });

  test('should return 500', async () => {
    const status = 500;
    const error = new UnknownError('Error');
    const ctx = {};
    const next = jest.fn(() => Promise.reject(error));

    await errorMiddleware(ctx, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.results[0].value).rejects.toBe(error);
    expect(ctx.status).toBe(status);
    expect(ctx.body).toMatchInlineSnapshot(`
      Object {
        "message": "Something is broken",
      }
    `);
  });
});
