const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static('../client/build'));

app.get('/api/tickets', async (req, res) => {
  const content = fs.readFileSync('./data.json');
  const json = JSON.parse(content);
  if (req.query.searchText) {
    const filteredTickets = json
      .filter((ticket) => ticket.title.toLowerCase().includes(req.query.searchText.toLowerCase()));
    res.send(filteredTickets);
  } else {
    res.send(json);
  }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  const content = fs.readFileSync('./data.json');
  const json = JSON.parse(content);
  json.forEach((ticket) => {
    if (ticket.id === req.params.ticketId) {
      ticket.done = true;
    }
  });
  fs.writeFileSync('./data.json', JSON.stringify(json, null, 2));
  res.send({ updated: true });
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  const content = fs.readFileSync('./data.json');
  const json = JSON.parse(content);
  json.forEach((ticket) => {
    if (ticket.id === req.params.ticketId) {
      ticket.done = false;
    }
  });
  fs.writeFileSync('./data.json', JSON.stringify(json, null, 2));
  res.send({ updated: true });
});

app.post('/api/tickets/', async (req, res) => {
  const content = fs.readFileSync('./data.json');
  const json = JSON.parse(content);
  json.unshift(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(json, null, 2));
  res.send(json);
});

module.exports = app;
