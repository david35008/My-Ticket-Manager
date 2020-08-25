import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import $ from 'jquery';
import Tickets from './Tickets';
import SearchAppBar from './SearchAppBar'

function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/tickets');
      setTicketsList(data);
    })();
  }, []);

  const serchTicket = async (textvalue) => {
    const { data } = await axios.get(`/api/tickets?searchText=${textvalue}`);
    setTicketsList(data);
  };

  const restoreHideTickets = async () => {
    $('.hiddenTicket').removeClass().addClass('ticket');
    setCounter(0);
  };

  return (
    <main id='main' >
      <SearchAppBar serchTicket={serchTicket} ticketsList={ticketsList} restoreHideTickets={restoreHideTickets} counter={counter}/>
      {ticketsList.map((ticket, index) => (
        <Tickets
          key={index}
          ticket={ticket}
          counter={counter}
          setCounter={setCounter}
        />
      ))}
    </main>
  );
}

export default App;
