const request = require('supertest');
const app = require('./app');

const projectName = '1.Tickets manager My tests backend';
describe(projectName, () => {
  test('Can post new ticket', async () => {
    const orginalList = await request(app)
      .get('/api/tickets')
      .expect(200);

    const newItem = {
      title: 'Test',
      content: 'Test',
      userEmail: 'Test',
      creationTime: 1525545111161,
    };
    
    const updatedList = await request(app)
    .post('/api/tickets')
    .send(newItem)
    .expect(200);

    expect(updatedList.body.length).toBe(orginalList.body.length + 1)
    expect(updatedList.body[0]).toMatchObject(newItem);
  });
});
