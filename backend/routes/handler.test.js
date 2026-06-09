const express = require('express');
const request = require('supertest');
const handler = require('./handler');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/', handler);
  return app;
}

describe('GET /tweets', () => {
  it('returns status 200', async () => {
    const res = await request(createApp()).get('/tweets');
    expect(res.statusCode).toBe(200);
  });

  it('returns an array of tweets', async () => {
    const res = await request(createApp()).get('/tweets');
    const body = JSON.parse(res.text);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it('each tweet has name, msg, and username fields', async () => {
    const res = await request(createApp()).get('/tweets');
    const body = JSON.parse(res.text);
    body.forEach((tweet) => {
      expect(tweet).toHaveProperty('name');
      expect(tweet).toHaveProperty('msg');
      expect(tweet).toHaveProperty('username');
    });
  });

  it('returns the expected hardcoded tweets', async () => {
    const res = await request(createApp()).get('/tweets');
    const body = JSON.parse(res.text);
    const usernames = body.map((t) => t.username);
    expect(usernames).toContain('codrkai');
    expect(usernames).toContain('samanthakai');
    expect(usernames).toContain('johnk');
  });
});

describe('POST /addTweet', () => {
  it('returns status 200', async () => {
    const res = await request(createApp())
      .post('/addTweet')
      .send({ name: 'Test', msg: 'Test msg', username: 'testuser' });
    expect(res.statusCode).toBe(200);
  });

  it('responds with NA', async () => {
    const res = await request(createApp())
      .post('/addTweet')
      .send({ name: 'Test', msg: 'Test msg', username: 'testuser' });
    expect(res.text).toBe('NA');
  });
});
