import React from 'react';
import { Tooltip, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReadMore from './ReadMore';

function Tickets({ ticket, handleHideTicket, changeDoneProperty }) {

  return (
    <div className="ticket">
      <Tooltip placement="top" title="Hide the ticket">
        <Button color="secondary" className="hideTicketButton" onClick={() => handleHideTicket(ticket.id)}>Hide</Button>
      </Tooltip>
      {ticket.done
        ? (
          <Tooltip placement="top" title="Press to marke as not done">
            <CheckCircleIcon className="checkButton" style={{ color: 'green' }} onClick={() => changeDoneProperty(ticket)} />
          </Tooltip>
        )
        : (
          <Tooltip placement="top" title="Press to marke as done">
            <HighlightOffIcon className="checkButton" style={{ color: 'red', cursor: 'pointer !important' }} onClick={() => changeDoneProperty(ticket)} />
          </Tooltip>
        )}
      <h3>{ticket.title}</h3>
      <ReadMore content={ticket.content} maxChar="300" />
      <p className="contactInfo">
        {ticket.userEmail} {}
        {new Date(ticket.creationTime).toString()}
      </p>
      {ticket.labels && ticket.labels.map((label, index) => (<div key={label} className="label"><Chip label={label} color="primary" /></div>))}
    </div>
  );
}

export default Tickets;
