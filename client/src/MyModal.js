import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, TextField } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MyModal({ showModal, setShowModal, loadList }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userEmail, setEmail] = useState('');
  const [labels, setLabels] = useState([]);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {
      id: uuidv4(),
      title,
      content,
      userEmail,
      creationTime: new Date().setHours(new Date().getHours() + 3),
      labels,
    };
    const { data } = await axios.post('/api/tickets/', newTicket);
    loadList();
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add new ticket</h2>
      <p id="simple-modal-description">
        Enter all the required fields, and press submit.
      </p>
      <form onSubmit={handleSubmit}>
        <TextField required label="enter your title" onChange={(e) => setTitle(e.target.value)} style={{ width: 400 }} multiline />
        <TextField required label="enter your content" onChange={(e) => setContent(e.target.value)} style={{ width: 400 }} multiline />
        <TextField required label="enter your userEmail " onChange={(e) => setEmail(e.target.value)} style={{ width: 400 }} multiline />
        <TextField
          style={{ width: 400 }}
          label="Enter Labels"
          placeholder="label,label,label"
          onChange={(e) => setLabels((e.target.value).split(','))}
        />

        <br />
        <Button variant="outlined" color="primary" type="submit" size="large">Submit</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
