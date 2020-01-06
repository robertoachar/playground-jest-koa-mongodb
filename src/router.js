import Router from 'koa-router';
import mongoose from 'mongoose';

const router = Router();

router.get('/', async ctx => {
  ctx.body = { message: 'Hello Playground' };
});

router.get('/healthz', async ctx => {
  return mongoose.connection.db
    .admin()
    .ping()
    .then(() => {
      ctx.status = 200;
    })
    .catch(() => {
      ctx.status = 500;
    });
});

export default router;
