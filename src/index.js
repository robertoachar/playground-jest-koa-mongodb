import { connect, disconnect } from './database';

(async () => {
  await connect();
  await disconnect();
})();
