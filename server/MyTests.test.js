const fs = require('fs').promises;
const request = require('supertest');
const app = require('./app');
const data = require('./data.json');

const projectName = '1.Tickets manager My tests backend';
describe(projectName, () => {
  test('Can post new ticket', async () => {
    const newItem = {
      id: '1111-1111-111-111',
      title: 'Test',
      content: 'Test',
      userEmail: 'Test',
      creationTime: 1525545111161,
    };
    const firstRes = await request(app)
      .get('/api/tickets');
    // .expect(200)
    await request(app).post('/api/tickets').send(newItem);
    const secondRes = await request(app).get('/api/tickets');
    expect(firstRes.body.length).toBe(secondRes.body.length - 1);
    expect(secondRes.body[0]).toMatchObject(newItem);
  });
});
