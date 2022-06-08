import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
let socket;

const Chat = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // open socket connection, connects immediately upon creation by default
    // create websocket
    socket = io();

    //listen for chat events
    socket.on('chat', (chat) => {
      // when we receive a chat, add it to messages array in state
      console.log(chat);
      setMessages((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect from socket
    return () => socket.disconnect();
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  //on form submit emit message through websocket
  const sendChat = (e) => {
    e.preventDefault();
    //.emit(event name,data)
    socket.emit('chat', { user: user.username, msg: chatInput });
    //add your message to the chat list
    // setMessages((messages) => [
    //   ...messages,
    //   { user: user.username, msg: chatInput },
    // ]);
    // clear the input field after the message is sent
    setChatInput('');
  };

  return (
    user && (
      <div>
        <div>
          {/* map over the messages array and print our the username and message for each chat. */}
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user ? `${message.user}:` : ''} ${
              message.msg
            }`}</div>
            // <div key={ind}>{`${message}`}</div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type='submit'>Send</button>
        </form>
      </div>
    )
  );
};

export default Chat;
