import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import $ from 'jquery';
import Tickets from './Tickets';
import MyModal from './MyModal';
import SearchAppBar from './SearchAppBar';

function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const loadList = async () => {
    const { data } = await axios.get('/api/tickets');
    setTicketsList(data);
  };

  useEffect(() => {
    loadList();
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
    <main id="main">
      <MyModal showModal={showModal} setShowModal={setShowModal} loadList={loadList} />
      <SearchAppBar serchTicket={serchTicket} ticketsList={ticketsList} restoreHideTickets={restoreHideTickets} counter={counter} setShowModal={setShowModal} />
      {ticketsList.map((ticket, index) => (
        <Tickets
        index={index}
          ticket={ticket}
          counter={counter}
          setCounter={setCounter}
        />
      ))}
    </main>
  );
}

export default App;
