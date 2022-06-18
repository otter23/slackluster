import './AddMessage.css';

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { SocketContext } from '../../context/SocketContext';
// const { socket: { current: socket }} = useContext(SocketContext);

import * as messagesActions from '../../store/messages';

export default function Message({
  addMessageBox,
  messagesBox,
  scrollToBottom,
  scrollBottom,
}) {
  const dispatch = useDispatch();
  const messageForm = useRef(null);
  const messageInputRef = useRef(null);

  //Redux State
  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //controlled inputs
  const [messageInput, setMessageInput] = useState('');
  const [errors, setErrors] = useState('');
  const [disabledSend, setDisabledSend] = useState(true);

  //reset input value and container height when change to another channel
  useEffect(() => {
    setMessageInput('');
    if (messageInputRef) messageInputRef.current.style.height = '22px';
  }, [channelId]);

  //disable send Message btn if input is blank
  useEffect(() => {
    if (messageInput === '') setDisabledSend(true);
  }, [messageInput]);

  //adjust height of textarea and message scrolling container based on content
  const autoHeight = (elem) => {
    // elem.style.height = '1px';
    elem.style.height = 'auto';
    elem.style.height = elem.scrollHeight + 'px';
    // if (addMessageBox.current && messagesBox.current) {
    let viewportHeight = window.innerHeight;
    let addMessageBoxHeight = addMessageBox.current?.offsetHeight;

    messagesBox.current.style.height = `${
      viewportHeight - 95 - addMessageBoxHeight
    }px`;

    if (scrollBottom) scrollToBottom();
    // }
  };

  //reset the height on the textarea and rest of page and scroll to bottom
  const resetInput = () => {
    if (messageInputRef) messageInputRef.current.style.height = '22px';

    if (addMessageBox && messagesBox) {
      let viewportHeight = window.innerHeight;
      let addMessageBoxHeight = addMessageBox.current?.offsetHeight;

      messagesBox.current.style.height = `${
        viewportHeight - 95 - addMessageBoxHeight
      }px`;
    }
    scrollToBottom();
  };

  //handle  'Enter' key press.
  const onEnterPress = (e) => {
    //prevent enter from creating a line break character
    if (!messageInput && e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      return;
    }
    //allow enter to submit the form
    //Can still use Shift + Enter to create new lines
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      messageForm.current?.requestSubmit();
    }
  };

  //Add message form submit handler
  const sendMessage = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    try {
      //could add a prev state holder, and then only send request if prev and current don't match
      //thunk to persist message in db, route will broadcast to other users once persisted
      const response = await dispatch(
        messagesActions.addMessageThunk({
          ownerId: sessionUser?.id,
          channelId,
          content: messageInput,
        })
      );

      if (response.ok) {
        // clear the input field after the message is sent
        setMessageInput('');
        resetInput();
        setDisabledSend(true);
        scrollToBottom();
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
    <div
      className='addMessage-container-inner'
      onClick={() => messageInputRef.current.focus()}
    >
      <div className='addMessage-top-container'>
        {errors?.length > 0 && (
          <div className='addMessage-error-container'>
            {errors?.map((error, ind) => (
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
              name='message'
              rows={1}
              // cols={5}
              value={messageInput ?? ''}
              ref={messageInputRef}
              placeholder={`Send a message to # ${channels[channelId]?.name} `}
              onKeyDown={onEnterPress}
              onChange={(e) => {
                setMessageInput(e.target.value);
                autoHeight(e.target);
                setDisabledSend(false);
              }}
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
            <div
              className={`addMessage-send-btn-img ${
                disabledSend && 'disabledSend'
              }`}
            ></div>
          </button>
        </div>
      </form>
    </div>
  );
}
