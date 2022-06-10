import './Chat.css';

import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SocketContext } from '../../context/SocketContext';

import * as messagesActions from '../../store/messages';

export default function Chat() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.messages.messagesByChannelId);

  useEffect(() => {
    console.log('MESSAGES', channels[1]);
  }, [channels]);

  //controlled inputs
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);

  //prettier-ignore
  const { socket: { current: socket }} = useContext(SocketContext);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  //on form submit emit message through websocket
  const sendChat = async (e) => {
    e.preventDefault();
    // setErrors([]); //reset error state

    try {
      //could add a prev state holder, and then only send request if prev and current don't match
      const response = await dispatch(
        messagesActions.addMessageThunk({
          ownerId: sessionUser.id,
          channelId: 1,
          content: chatInput,
        })
      );

      if (response.ok) {
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      console.log(data);
      // if (data && data.errors) setErrors(data.errors);
    }

    //add your message to the chat list
    // setMessages((messages) => [
    //   ...messages,
    //   { user: user.username, msg: chatInput },
    // ]);
    // clear the input field after the message is sent
    setChatInput('');
  };
  return (
    sessionUser && (
      <div className='chat-main-container'>
        <div className='chat-main-container-inner'>
          {/* map over the messages array and print our the username and message for each chat. */}
          {channels[1]?.map((message, ind) => (
            <div className='chat-message-container' key={ind}>
              {`${message.ownerId ? `User ${message.ownerId} - ` : ''}${
                message.content
              }`}
            </div>
          ))}
        </div>
        <form onSubmit={sendChat} className='chat-form'>
          <input value={chatInput} onChange={updateChatInput} />
          <button type='submit'>Send</button>
        </form>
      </div>
    )
  );
}
