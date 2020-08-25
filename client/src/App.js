import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Tickets from './Tickets';
import $ from 'jquery';

function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0)

  useEffect(() => {
  (async () => {
      const {data} = await axios.get('/api/tickets')
      setTicketsList(data);
    })()
  }, []);

  const serchTicket = async (textvalue) => {
    const {data} = await axios.get(`/api/tickets?searchText=${textvalue}`)
    setTicketsList(data);
  };

  const restoreHideTickets = async () => {
      $('.hiddenTicket').removeClass().addClass('ticket');
    setCounter(0);
  };

  return (
    <main>
      <input id="searchInput" onChange={(e) => serchTicket(e.target.value)} />
      <br/>
      <span className='showingResaults'>showing {ticketsList.length} resaults</span>
      {counter > 0 && 
      <span>
    {' ('}<span id='hideTicketsCounter'>{counter}</span> Hidden tickets - <button id="restoreHideTickets" onClick={restoreHideTickets} >restore</button> )
  </span>}
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