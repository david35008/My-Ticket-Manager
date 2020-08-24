const express = require('express');
const fs = require('fs').promises;

const app = express();

// const path =  process.env.GLOBAL_VAR || './records.json';
// const path = process.env.NODE_ENV === 'test' ? './recordsTest.json' : './records.json';
// console.log(process.env.NODE_ENV);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static('../client/build'));

app.get('/api/records', async (req, res) => {
  const content = await fs.readFile(path);
  const json = JSON.parse(content);
  res.send(json);
});

app.post('/api/records', async (req, res) => {
  const content = await fs.readFile(path);
  const json = JSON.parse(content);
  json.push(req.body);
  const message = JSON.stringify(json);
  await fs.writeFile(path, message);
  res.send(json);
});

app.delete('/api/records', async (req, res) => {
  await fs.writeFile(path, '[{"id":"1","winnerName":"no body","date":"never","gameDuration":"0"}]');
  res.send('deleteed');
});

app.get('/', (req, res) => {
  res.send('hello');
});

module.exports = app;
