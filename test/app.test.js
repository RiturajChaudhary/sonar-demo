const assert = require('node:assert/strict');
const test = require('node:test');
const request = require('supertest');
const { createApp } = require('../src/app');

const app = createApp();

test('GET /health returns a healthy status', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok' });
  assert.equal(response.headers['x-content-type-options'], 'nosniff');
});

test('GET /api/greeting uses the supplied name', async () => {
  const response = await request(app).get('/api/greeting?name=Ada');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { message: 'Hello, Ada!' });
});

test('GET /api/greeting defaults to world', async () => {
  const response = await request(app).get('/api/greeting');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { message: 'Hello, world!' });
});

test('unknown routes return JSON 404', async () => {
  const response = await request(app).get('/missing');

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, { error: 'Not found' });
});