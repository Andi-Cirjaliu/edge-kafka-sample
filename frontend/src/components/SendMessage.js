import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import appContext from '../context/AppContext';

const SendMessage = () => {
    const [message, setMessage] = useState('');
    const { loading, sendMessage } = useContext(appContext);

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();

        const msg = {message: message}

        sendMessage(msg);

        setMessage('');
    }

    if ( loading ) {
      return (
        <div  style={{marginTop:'50px'}}>
          Sending message...
        </div>
      )
    }

    return (
      // <div>
      //     Message to send
      //     <form onSubmit={onSubmit}>
      //         <input type="text" name="message" value={message} onChange={onChange} />
      //         <button>Send</button>
      //     </form>
      // </div>

      <Form onSubmit={onSubmit} style={{marginTop:'50px'}}>
        <Form.Group controlId="formBasicSendMessage">
          <Form.Label>Message to send</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a new message"
            name="message"
            value={message}
            onChange={onChange}
            htmlSize="50"
            size="sm"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    );
}

export default SendMessage;