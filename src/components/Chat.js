import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');  // Connect to backend server

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on('message', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });
  }, []);

  // Send message to server
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage('');  // Clear input after sending
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
