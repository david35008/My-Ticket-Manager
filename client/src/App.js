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

  // load the tickets list from server
  const loadList = async () => {
    const { data } = await axios.get('/api/tickets');
    setTicketsList(data);
  };

  useEffect(() => {
    loadList();
  }, []);

  // send request of search to server and update the tickets list
  const serchTicket = async (textvalue) => {
    const { data } = await axios.get(`/api/tickets?searchText=${textvalue}`);
    setTicketsList(data);
  };

  // restore all hidden tickets
  const restoreHideTickets = async () => {
    $('.hiddenTicket').removeClass().addClass('ticket');
    setCounter(0);
  };

  return (
    <main id="main">
      <MyModal showModal={showModal} setShowModal={setShowModal} loadList={loadList} setTicketsList={setTicketsList}/>
      <SearchAppBar serchTicket={serchTicket} ticketsList={ticketsList} restoreHideTickets={restoreHideTickets} counter={counter} setShowModal={setShowModal} />
      {ticketsList.map((ticket, index) => (
        <Tickets
          index={index}
          ticket={ticket}
          counter={counter}
          setCounter={setCounter}
          loadList={loadList}
        />
      ))}
    </main>
  );
}

export default App;
