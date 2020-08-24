const express = require('express');
const fs = require('fs').promises;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', express.static('../client/build'));

// JSON.stringify(allTickets, null, 2)

app.get('/api/tickets', async (req, res) => {
  const content = await fs.readFile('./data.json');
  const json = JSON.parse(content);
  if (req.query.searchText) {
    const filteredTickets = json
      .filter((ticket) => ticket.title.toLowerCase().includes(req.query.searchText));
    res.send(filteredTickets);
  } else {
    res.send(json);
  }
});

// app.post('/api/records', async (req, res) => {
//   const content = await fs.readFile(path);
//   const json = JSON.parse(content);
//   json.push(req.body);
//   const message = JSON.stringify(json);
//   await fs.writeFile(path, message);
//   res.send(json);
// });

// app.delete('/api/records', async (req, res) => {
// await fs.writeFile(path, '[{"id":"1","winnerName":"no body","date":"never","gameDuration":"0"}]');
//   res.send('deleteed');
// });

// app.get('/', (req, res) => {
//   res.send('hello');
// });

module.exports = app;
