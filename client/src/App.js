import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import Tickets from './Tickets';
import MyModal from './MyModal';
import SearchAppBar from './SearchAppBar';

function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [idListHiddenTickets, setIdListHiddenTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadList();
  }, []);

  const inputRef = useRef();

  const listForMap = ticketsList.filter(ticket => !ticket.hidden);

  // update which ticket is hidden
  const filterHiddenTickets = (data) => {
    setTicketsList(data.map(ticket => {
      if (idListHiddenTickets.some(id => ticket.id === id)) {
        ticket.hidden = true;
      }
      return ticket;
    }));
  }

  // load the tickets list from server
  const loadList = async () => {
    try {
      const { data } = await axios.get('/api/tickets');
      filterHiddenTickets(data)
    } catch (error) {
      console.error(error.message);
    }
  };

  // send request of search to server and update the tickets list
  const serchTicket = async (textvalue) => {
    try {
      const { data } = await axios.get(`/api/tickets?searchText=${textvalue}`);
      filterHiddenTickets(data)
    } catch (error) {
      console.error(error.message);
    }
  };

  // hide ticket from the list
  const handleHideTicket = (id) => {
    const cloneList = ticketsList.map(ticket => {
      if (ticket.id === id) {
        ticket.hidden = true;
      }
      return ticket;
    })
    setTicketsList(cloneList)
    setIdListHiddenTickets(idListHiddenTickets.concat([id]))
  }

  // restore all hidden tickets
  const restoreHideTickets = () => {
    let idCloneList = idListHiddenTickets.slice();
    setTicketsList(ticketsList.map(ticket => {
      if (ticket.hidden) {
        ticket.hidden = false;
        idCloneList = idCloneList.filter(id => ticket.id !== id);
      }
      return ticket;
    }))
    setIdListHiddenTickets(idCloneList);
  };

  // sending request to server for change done property
  const changeDoneProperty = async (ticket) => {
    try {
      ticket.done
        ? await axios.post(`/api/tickets/${ticket.id}/undone`)
        : await axios.post(`/api/tickets/${ticket.id}/done`);
      loadList();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main id="main">
      <MyModal showModal={showModal} setShowModal={setShowModal} loadList={loadList} inputRef={inputRef} />
      <SearchAppBar serchTicket={serchTicket} ticketsList={ticketsList} restoreHideTickets={restoreHideTickets} inputRef={inputRef} setShowModal={setShowModal} listForMap={listForMap} />
      {listForMap.length > 0 ?
        listForMap.map((ticket, index) => (
          <Tickets
            key={ticket.id}
            ticket={ticket}
            handleHideTicket={handleHideTicket}
            changeDoneProperty={changeDoneProperty}
          />
        ))
        : <h1>There is no tickets for show</h1>
      }
    </main>
  );
}
export default App;
