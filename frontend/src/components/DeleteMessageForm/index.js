import './DeleteMessage.css';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as messagesActions from '../../store/messages';

const dayjs = require('dayjs');

export default function DeleteMessage({
  closeModal,
  message,
  closeDeleteMessage,
}) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users.usersByUserId);
  const channelId = useSelector((state) => state.channels.currentChannelId);
  // const messages = useSelector((state) => state.messages.messagesByChannelId);
  // const channels = useSelector((state) => state.channels.channelByChannelId);

  const [errors, setErrors] = useState([]);

  //submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    try {
      const response = await dispatch(
        // ownerId, messageId, channelId
        messagesActions.deleteMessageThunk(
          sessionUser?.id,
          message?.id,
          channelId
        )
      );
      if (response.ok) {
        closeModal();
        closeDeleteMessage();
      }
    } catch (errorResponse) {
      const resBody = await errorResponse.json();
      if (resBody && resBody.errors) {
        setErrors(resBody.errors);
      } else {
        console.log(errorResponse);
      }
    }
  };

  return (
    <>
      <div className='deleteMessage-card-container'>
        <div className='deleteMessage-card'>
          <div className='deleteMessage-header'>
            <div className='deleteMessage-header-left delete'>
              <div> Delete message</div>
            </div>
            <div
              className='deleteMessage-close'
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              <div className='material-symbols-outlined  '>close</div>
            </div>
          </div>

          <form
            className='deleteMessage-form'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <div className='deleteMessage-subheader'>
              <span>
                Are you sure you want to delete this message? This cannot be
                undone.
              </span>
            </div>
            {errors?.length > 0 && (
              <div className='deleteMessage-error-container'>
                {errors?.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            )}

            <div className='deleteMessage-form-group'>
              <div className={`deleteMessage-message-list-item`}>
                <div className={`deleteMessage-message-img default`}></div>

                <div className={`deleteMessage-message-right`}>
                  <div className={`deleteMessage-message-top`}>
                    <div className={`deleteMessage-message-displayName`}>
                      {`${users[message?.ownerId]?.username}`}
                    </div>

                    <div className={`deleteMessage-message-timestamp`}>
                      {`${dayjs(message?.createdAt)?.format('MMMM D,')} at `}
                      {`${dayjs(message?.createdAt)?.format('	h:mm A')}`}
                    </div>
                  </div>

                  <pre className={'deleteMessage-message-content'}>
                    {`${message?.content}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className='deleteMessage-buttons-container'>
              <div
                className='deleteMessage-cancel-btn-container'
                onClick={(e) => {
                  e.stopPropagation();
                  closeDeleteMessage();
                  closeModal();
                }}
              >
                <div className='deleteMessage-cancel-btn'>Cancel</div>
              </div>

              <button
                className={`deleteMessage-delete-btn-container`}
                type='submit'
              >
                <div className='deleteMessage-delete-btn'>Delete</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
