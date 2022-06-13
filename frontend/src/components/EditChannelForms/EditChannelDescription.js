import './EditChannel.css';

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';

export default function EditChannelDescription({ closeModal }) {
  const dispatch = useDispatch();
  const descriptionInputRef = useRef(null);

  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //slices of react state for controlled inputs
  const [channelName, setChannelName] = useState(channels[channelId]?.name);
  const [channelTopic, setChannelTopic] = useState(channels[channelId]?.topic);
  const [channelDescription, setChannelDescription] = useState(
    channels[channelId]?.description
  );
  const [errors, setErrors] = useState([]);

  //autofocus input field
  useEffect(() => {
    descriptionInputRef.current.focus();
  }, []);

  //submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    try {
      const response = await dispatch(
        channelsActions.updateChannelThunk({
          channelId,
          name: channelName,
          topic: channelTopic,
          description: channelDescription,
        })
      );
      if (response.ok) {
        closeModal();
      }
    } catch (errorResponse) {
      const resBody = await errorResponse.json();
      if (resBody && resBody.errors) {
        if (resBody.errors[0] === 'Don’t forget to name your channel.')
          setErrors(['Don’t forget to name your channel.']);
        else {
          setErrors(resBody.errors);
        }
      }
    }
  };

  return (
    <>
      <div className='editChannel-card-container'>
        <div className='editChannel-card'>
          <div className='editChannel-header'>
            <div className='editChannel-header-left'>
              <div>Edit description</div>
            </div>
            <div
              className='editChannel-close'
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              <div className='material-symbols-outlined  '>close</div>
            </div>
          </div>

          <form
            className='editChannel-form'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <div className='editChannel-form-group'>
              <label className='editChannel-form-label' htmlFor='topic'></label>
              {errors.length > 0 && (
                <div className='editChannel-error-container'>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
              )}
              <div className='editChannel-form-textarea-wrapper'>
                <textarea
                  id='name'
                  className='editChannel-form-textarea'
                  rows={5}
                  cols={5}
                  value={channelDescription ?? ''}
                  onChange={(e) => {
                    setChannelDescription(e.target.value);
                  }}
                  placeholder='Add a description'
                  name='topic'
                  ref={descriptionInputRef}
                ></textarea>
              </div>

              <div className='editChannel-instructions'>
                Let people know what this channel is for.
              </div>
            </div>

            <div className='editChannel-buttons-container'>
              <div
                className='editChannel-cancel-btn-container'
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                <div className='editChannel-cancel-btn'>Cancel</div>
              </div>

              <button className={`editChannel-save-btn-container`}>
                <div className='editChannel-save-btn' type='submit'>
                  Save
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
