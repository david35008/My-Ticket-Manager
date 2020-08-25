import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Tickets from './Tickets';

function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const fetchFata = async () => {
      const ticketsFromServer = await axios.get('/api/tickets')
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setTicketsList(ticketsFromServer);
    };
    fetchFata();
  }, []);

  const serchTicket = async (textvalue) => {
    const ticketsFromServer = await axios.get(`/api/tickets?searchText=${textvalue}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setTicketsList(ticketsFromServer);
  };

  return (
    <main>
      <input id="searchInput" onChange={(e) => serchTicket(e.target.value)} />
  <div id='hideTicketsCounter' >{counter}</div>
      {ticketsList.map((ticket, index) => {
      return (
            <Tickets
              key={index}
              ticket={ticket}
              counter={counter}
              setCounter={setCounter}
            />
          );
      })}
    </main>
  );
}

export default App;
