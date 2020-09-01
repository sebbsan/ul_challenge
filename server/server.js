/* eslint-disable no-console */
const config = require('./config');
const app = require('./lib/app').default;

const startServer = async () => {
  app.listen(config.port, () => {
    console.info(`application running on port ${config.port}`);
  });
};

startServer();

process.on('SIGINT', async () => {
  console.info('Caught SIGINT signal');
  console.info('shutdown successful');
  process.exit(0);
});
