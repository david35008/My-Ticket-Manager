import React from 'react';
import ReadMore from './ReadMove';

function Tickets({ ticket, setCounter, counter }) {
  return (
    <div className="ticket">
      <button className="hideTicketButton" onClick={(e) => { e.target.parentNode.className = 'hiddenTicket'; setCounter(counter + 1); }}>Hide</button>
      <h3>{ticket.title}</h3>
      <ReadMore content={ticket.content} maxChar="400" />
      <p>{ticket.userEmail}</p>
      <p>{new Date(ticket.creationTime).toUTCString() }</p>
      {ticket.labels && ticket.labels.map((label) => (<span className="label">{label}</span>))}
    </div>
  );
}

export default Tickets;
