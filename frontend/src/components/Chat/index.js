import './Chat.css';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { SocketContext } from '../../context/SocketContext';
// const { socket: { current: socket }} = useContext(SocketContext);

import * as messagesActions from '../../store/messages';

export default function Chat({ channelId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  //controlled inputs
  const [chatInput, setChatInput] = useState('');

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
          channelId,
          content: chatInput,
        })
      );

      if (response.ok) {
        // clear the input field after the message is sent
        setChatInput('');
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      console.log(data);
      // if (data && data.errors) setErrors(data.errors);
    }
  };
  return (
    <div className='chat-main-container'>
      <form onSubmit={sendChat} className='chat-form'>
        <input
          value={chatInput}
          onChange={updateChatInput}
          className='chat-form-input'
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
