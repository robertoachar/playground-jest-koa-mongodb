import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import koaLogger from 'koa-logger';
import helmet from 'koa-helmet';

import error from './error';
import logger from './logger';
import router from './router';

const app = new Koa();
app.use(helmet());
app.use(bodyParser());
app.use(cors());
app.use(koaLogger(str => logger.info(str)));
app.use(error);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
