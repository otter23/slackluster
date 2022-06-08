import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { SocketContext } from '../../context/SocketContext';

export default function Chat() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

  //prettier-ignore
  const { socket: { current: socket }} = useContext(SocketContext);

  //when component first mounts add broadcast listener
  useEffect(() => {
    //listen for chat events
    console.log('CHAT SOCKET', socket);
    socket?.on('chat', (chat) => {
      // when we receive a chat, add it to messages array in state
      setMessages((messages) => [...messages, chat]);
    });
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
}
