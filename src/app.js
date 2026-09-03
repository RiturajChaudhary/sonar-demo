const express = require('express');
const helmet = require('helmet');

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(express.json({ limit: '10kb' }));

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.get('/api/greeting', (request, response) => {
    const name = typeof request.query.name === 'string' && request.query.name.trim()
      ? request.query.name.trim()
      : 'world';

    response.json({ message: `Hello, ${name}!` });
  });

  app.use((_request, response) => {
    response.status(404).json({ error: 'Not found' });
  });

  return app;
}

module.exports = { createApp };