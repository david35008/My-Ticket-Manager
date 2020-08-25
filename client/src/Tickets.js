import React from 'react';
import { Tooltip } from '@material-ui/core';
import ReadMore from './ReadMove';
import { Button } from '@material-ui/core';

function Tickets({ ticket, setCounter, counter }) {
  return (
    <div className="ticket">
      <Tooltip placement="top" title="hide">
        <Button color='secondary' className="hideTicketButton" onClick={(e) => { e.target.parentNode.parentNode.className = 'hiddenTicket'; setCounter(counter + 1); }}>Hide</Button>
      </Tooltip>
      <h3>{ticket.title}</h3>
      <ReadMore content={ticket.content} maxChar="300" />
      <p className='contactInfo' >{ticket.userEmail}{new Date(ticket.creationTime).toString() }</p>
      {ticket.labels && ticket.labels.map((label) => (<span className="label">{label}</span>))}
    </div>
  );
}

export default Tickets;
