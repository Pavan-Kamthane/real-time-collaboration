import React, { useState, useEffect } from 'react';
// import './style.css'; // Ensure this path is correct
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, fromMe: true }]);
      setInput('');
    }
  };

  useEffect(() => {
    // This is where you would typically set up a WebSocket connection to receive messages.
    // For example:
    const socket = io('http://localhost:4000');
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, { text: message, fromMe: false }]);
    });

    // Cleanup code if needed
    return () => socket.disconnect();
  }, []);

  return (
    <div className="chat-area">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.fromMe ? 'from-me' : 'from-others'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
