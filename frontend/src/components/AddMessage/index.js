import './AddMessage.css';

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { SocketContext } from '../../context/SocketContext';
// const { socket: { current: socket }} = useContext(SocketContext);

import * as messagesActions from '../../store/messages';

export default function Message() {
  const dispatch = useDispatch();
  const messageForm = useRef(null);

  //Redux State
  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //controlled inputs
  const [messageInput, setMessageInput] = useState('');
  const [errors, setErrors] = useState('');
  const [disabledSend, setDisabledSend] = useState(true);

  //reset input when change to another channel
  useEffect(() => {
    setMessageInput('');
  }, [channelId]);

  //disable send Message btn if input is blank
  useEffect(() => {
    if (messageInput === '') setDisabledSend(true);
  }, [messageInput]);

  //adjust height of textarea based on content
  const autoHeight = (elem) => {
    elem.style.height = '1px';
    elem.style.height = elem.scrollHeight + 'px';
  };

  //allow 'enter' to submit form request. Can still use shiftEnter to create new lines
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      messageForm.current.requestSubmit();
    }
  };

  //Function to scroll to bottom (e.g. after submit)
  const scrollBottom = () => {
    const channelScroll = document.querySelector(
      '.channelDisplay-message-container-inner'
    );
    //prettier-ignore
    // channelScroll.scrollTop = channelScroll.scrollHeight- channelScroll.clientHeight
    channelScroll.scrollTop = channelScroll.scrollHeight;
    // channelScroll.scrollIntoView();
  };

  //form submit handler
  const sendMessage = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    try {
      //could add a prev state holder, and then only send request if prev and current don't match
      //thunk to persist message in db, route will broadcast to other users once persisted
      const response = await dispatch(
        messagesActions.addMessageThunk({
          ownerId: sessionUser.id,
          channelId,
          content: messageInput,
        })
      );

      if (response.ok) {
        // clear the input field after the message is sent
        setMessageInput('');
        setDisabledSend(true);
        scrollBottom();
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      console.log(data);
      // if (data && data.errors) setErrors(data.errors);
      setDisabledSend(true);
    }
  };

  return (
    <div className='addMessage-container-inner'>
      <div className='addMessage-top-container'>
        {errors.length > 0 && (
          <div className='addMessage-error-container'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        )}
      </div>

      <form
        className='addMessage-form'
        onSubmit={sendMessage}
        ref={messageForm}
        autoComplete='off'
      >
        <div className='addMessage-form-group'>
          {/* <label className='addMessage-form-label' htmlFor='message'></label> */}
          <div className='addMessage-form-textarea-wrapper'>
            <textarea
              id='message'
              className='addMessage-form-textarea'
              rows={1}
              // cols={5}
              value={messageInput ?? ''}
              onKeyDown={onEnterPress}
              onChange={(e) => {
                setMessageInput(e.target.value);
                autoHeight(e.target);
                setDisabledSend(false);
              }}
              placeholder={`Send a message to # ${channels[channelId]?.name} `}
              name='message'
            ></textarea>
          </div>
        </div>

        <div className='addMessage-bottom-container'>
          <button
            className={`addMessage-send-btn-container ${
              disabledSend && 'disabledSend'
            }`}
            type='submit'
            disabled={disabledSend}
          >
            <div className='addMessage-send-btn-img'></div>
          </button>
        </div>
      </form>
    </div>
  );
}
