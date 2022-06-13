import './EditChannel.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';

export default function EditChannelName({ closeModal }) {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //slices of react state for controlled inputs
  const [channelName, setChannelName] = useState(channels[channelId]?.name);
  const [channelTopic, setChannelTopic] = useState(channels[channelId]?.topic);
  const [channelDescription, setChannelDescription] = useState(
    channels[channelId]?.description
  );
  const [errors, setErrors] = useState([]);
  const [disabledSave, setDisabledSave] = useState(false);

  //disable form submit if name has not been change
  useEffect(() => {
    if (channels[channelId]?.name === channelName) {
      setDisabledSave(true);
    }
  }, [channelName, channels, channelId]);

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
      setDisabledSave(true);
    }
  };

  return (
    <>
      <div className='editChannel-card-container'>
        <div className='editChannel-card'>
          <div className='editChannel-header'>
            <div className='editChannel-header-left'>
              <div>Rename this channel</div>
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
              <label className='editChannel-form-label' htmlFor='name'>
                Channel name
              </label>
              {errors.length > 0 && (
                <div className='editChannel-error-container'>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
              )}

              <input
                id='name'
                className='editChannel-form-input'
                type='text'
                value={channelName ?? ''}
                onChange={(e) => {
                  setChannelName(e.target.value);
                  setDisabledSave(false);
                }}
                placeholder='e.g. marketing'
                name='name'
              ></input>
              <div className='editChannel-hash-icon'></div>
              <div className='editChannel-instructions'>
                Names must be lowercase, without spaces or periods, and can’t be
                longer than 80 characters.
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

              <button
                className={`editChannel-save-btn-container ${
                  disabledSave && 'disabledSave'
                }`}
                type='submit'
                disabled={disabledSave}
              >
                <div className='editChannel-save-btn'>Save Changes</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
