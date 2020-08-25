import React from 'react';

function Tickets({ ticket }) {

  return (
    <div className="ticket">
      <button className="hideTicketButton">Hide</button>
      <h3>{ticket.title}</h3>
      <p>{ticket.content}</p>
      <p>{ticket.userEmail}</p>
      <p>{ticket.creationTime}</p>
      {ticket.labels && ticket.labels.map((label) => (<span className="label">{label}</span>))}
    </div>
  );
}

export default Tickets;
