import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import Tickets from './Tickets';
import MyModal from './MyModal';
import SearchAppBar from './SearchAppBar';

function App() {
  const [ticketsList, setTicketsList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const inputRef = useRef();

  const listForMap =ticketsList.filter(ticket => !ticket.hidden);
  
  // load the tickets list from server
  const loadList = async () => {
    try {
    const { data } = await axios.get('/api/tickets');
    
    setTicketsList(data.map(ticket => {
      if (idList.some(id => ticket.id === id)) {
        ticket.hidden = true;
      }
      return ticket;
    }))
  } catch(e){ 
    e.response.status?
    console.log("server not response")
    : console.log("bad response from server");
  }
  
  };

  useEffect(() => {
    loadList();
  }, []);

  // send request of search to server and update the tickets list
  const serchTicket = async (textvalue) => {
    const { data } = await axios.get(`/api/tickets?searchText=${textvalue}`);
    setTicketsList(data.map(ticket => {
      if (idList.some(id => ticket.id === id)) {
        ticket.hidden = true;
      }
      return ticket;
    }));
  };

  const handleHideTicket = (id) => {
    const cloneList = ticketsList.map(ticket => {
      if (ticket.id === id) {
        ticket.hidden = true;
      }
      return ticket;
    })
    setTicketsList(cloneList)
    setIdList(idList.concat([id]))
  }

  // restore all hidden tickets
  const restoreHideTickets =  () => {
    let idCloneList = idList.slice();
    setTicketsList(ticketsList.map(ticket => {
      if (ticket.hidden) {
        ticket.hidden = false;
        idCloneList = idCloneList.filter(id => ticket.id !== id);
      }
      return ticket;
    }))
    setIdList(idCloneList);
  };

  // sending request to server to change done property
  const changeDoneProperty = async (ticket) => {
    ticket.done
      ? await axios.post(`/api/tickets/${ticket.id}/undone`)
      : await axios.post(`/api/tickets/${ticket.id}/done`);
    loadList();
  };



  return (
    <main id="main">
      <MyModal showModal={showModal} inputRef={inputRef} setShowModal={setShowModal} loadList={loadList} setTicketsList={setTicketsList} />
      <SearchAppBar serchTicket={serchTicket} inputRef={inputRef} ticketsList={ticketsList} listForMap={listForMap} restoreHideTickets={restoreHideTickets} setShowModal={setShowModal} />
      {listForMap.length > 0 ?
      listForMap.map((ticket, index) => (
        <Tickets
          index={index}
          ticket={ticket}
          loadList={loadList}
          handleHideTicket={handleHideTicket}
          changeDoneProperty={changeDoneProperty}
        />
      ))
    :<h1>There is no tickets for show</h1>
    }
    </main>
  );
}

export default App;
