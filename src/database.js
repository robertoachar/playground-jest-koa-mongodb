import mongoose from 'mongoose';

import config from './config';
import logger from './logger';

const connect = async () => {
  mongoose.Promise = global.Promise;

  await mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const disconnect = async () => {
  await mongoose.disconnect();
};

mongoose.connection
  .on('open', () => logger.info('Connection opened'))
  .on('error', error => logger.error(error))
  .on('close', () => logger.warn('Connection closed'))
  .on('connected', () => logger.info('Database connected'))
  .on('disconnected', () => logger.warn('Database disconnected'));

export { connect, disconnect };
