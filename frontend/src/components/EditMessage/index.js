import './EditMessage.css';

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as messagesActions from '../../store/messages';

export default function Message({
  message,
  closeEditMessage,
  openDeleteMessageModal,
}) {
  const dispatch = useDispatch();
  const editMessageForm = useRef(null);
  const editMessageInputRef = useRef(null);

  //controlled inputs
  const [messageInput, setMessageInput] = useState(message.content || '');
  const [errors, setErrors] = useState('');

  //autofocus input field and move cursor to end
  useEffect(() => {
    autoHeight(editMessageInputRef.current);
    editMessageInputRef.current?.focus();
    let len = messageInput.length;
    editMessageInputRef.current?.setSelectionRange(len, len);
    // eslint-disable-next-line
  }, []);

  //adjust height of textarea container based on content
  const autoHeight = (elem) => {
    // elem.style.height = '1px';
    elem.style.height = 'auto';
    elem.style.height = elem.scrollHeight + 'px';
  };

  //Allow 'Enter' to submit form request. Can still use Shift + Enter to create new lines
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      editMessageForm.current.requestSubmit();
    }
  };

  //Add message form submit handler
  const sendMessage = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    if (!messageInput) {
      openDeleteMessageModal();
      return;
    }

    try {
      // { messageId, channelId, groupId, threadId, content }
      const response = await dispatch(
        messagesActions.updateMessageThunk({
          messageId: message.id,
          channelId: message.channelId,
          content: messageInput,
        })
      );

      if (response.ok) {
        // clear the input field and switch views after the message is sent
        closeEditMessage();
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      console.log(data);
      // if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <div
      className='editMessage-container-inner'
      onClick={() => editMessageInputRef.current.focus()}
    >
      <div className='editMessage-top-container'>
        {errors.length > 0 && (
          <div className='editMessage-error-container'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        )}
      </div>

      <form
        className='editMessage-form'
        onSubmit={sendMessage}
        ref={editMessageForm}
        autoComplete='off'
      >
        <div className='editMessage-form-group'>
          {/* <label className='editMessage-form-label' htmlFor='message'></label> */}
          <div className='editMessage-form-textarea-wrapper'>
            <textarea
              id='message'
              className='editMessage-form-textarea'
              name='message'
              rows={1}
              // cols={5}
              value={messageInput ?? ''}
              ref={editMessageInputRef}
              placeholder={`Edit message`}
              onKeyDown={onEnterPress}
              onChange={(e) => {
                setMessageInput(e.target.value);
                autoHeight(e.target);
              }}
            ></textarea>
          </div>
        </div>

        <div className='editMessage-bottom-container'>
          <div
            className='editMessage-cancel-btn-container'
            onClick={(e) => {
              e.stopPropagation();
              closeEditMessage();
            }}
          >
            <div className='editMessage-cancel-btn'>Cancel</div>
          </div>

          <div
            className={`editMessage-save-btn-container`}
            onClick={() => editMessageForm.current?.requestSubmit()}
            type='submit'
          >
            <div className='editMessage-save-btn'>Save</div>
          </div>
        </div>
      </form>
    </div>
  );
}
