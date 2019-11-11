import app from './app';
import config from './config';
import logger from './logger';
import { connect } from './database';

(async () => {
  await connect();

  app.listen(config.PORT, () => {
    logger.info('Server is running...');
  });
})();
