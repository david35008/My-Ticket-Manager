const express = require('express');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static('../client/build'));

app.get('/api/tickets', (req, res) => {
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

app.post('/api/tickets/:ticketId/:done', (req, res) => {
  const content = fs.readFileSync('./data.json');
  let json = JSON.parse(content);
  let updated = false;
  const done = req.params.done === "done"
  try {
    json.forEach((ticket) => {
      if (ticket.id === req.params.ticketId) {
        if (ticket.done !== done) {
          ticket.done = done;
          updated = true;
        }
      }
    });
    fs.writeFileSync('./data.json', JSON.stringify(json, null, 2));
    res.send({ updated });
  } catch (e) { res.send({ updated }) }
})

app.post('/api/tickets/', (req, res) => {
  const ticket = req.body
  if (typeof (ticket.title) === "string" && typeof (ticket.content) === "string" && typeof (ticket.userEmail) === "string" && typeof (ticket.creationTime) == "number") {
    const content = fs.readFileSync('./data.json');
    const json = JSON.parse(content);
    const newTicket = {
      id: uuidv4(),
      title: ticket.title,
      content: ticket.content,
      userEmail: ticket.userEmail,
      creationTime: ticket.creationTime
    }
    let labelsArg = ticket.labels
    labelsArg && labelsArg.length && labelsArg[0].length && (newTicket.labels = labelsArg);
    json.unshift(newTicket);
    fs.writeFileSync('./data.json', JSON.stringify(json, null, 2));
    res.send(json);
  } else {
    res.status(400).send("Request data isn't good");
  }
});

module.exports = app;
