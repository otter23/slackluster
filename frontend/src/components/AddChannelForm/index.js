import './AddChannelForm.css';

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';

export default function AddChannelName({ closeModal }) {
  const dispatch = useDispatch();
  const nameInputRef = useRef(null);

  const sessionUser = useSelector((state) => state.session.user);

  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //slices of react state for controlled inputs
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  const [errors, setErrors] = useState([]);
  const [errorsDesc, setErrorsDesc] = useState([]);

  const [disabledCreate, setDisabledCreate] = useState(true);
  const [firstRender, setFirstRender] = useState(false);

  //after first render, show user error if field is blank
  useEffect(() => {
    if (firstRender) {
      if (channelName === '') {
        setDisabledCreate(true);
        setErrors(["Don't forget to name your channel"]);
      } else {
        setDisabledCreate(false);
        setErrors([]);
      }
    }
    // eslint-disable-next-line
  }, [channelName]);

  //autofocus input field
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  //disable form submit if name has not been change
  useEffect(() => {
    if (channels[channelId]?.name === channelName) {
      setDisabledCreate(true);
    }
  }, [channelName, channels, channelId]);

  //submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    try {
      const response = await dispatch(
        channelsActions.addChannelThunk({
          ownerId: sessionUser?.id,
          name: channelName,
          topic: null,
          description: channelDescription,
        })
      );
      if (response.ok) {
        closeModal();
      }
    } catch (errorResponse) {
      const resBody = await errorResponse.json();
      if (resBody && resBody.errors) {
        resBody.errors.forEach((error) => {
          if (error === 'Don’t forget to name your channel.') {
            setErrors([error]);
          } else if (
            error ===
            'Channel descriptions can only include up to 250 characters — please make this description shorter.'
          )
            setErrorsDesc([error]);
          else {
            setErrors([...errors, error]);
          }
        });
      }
      setDisabledCreate(true);
    }
  };

  useEffect(() => {
    setFirstRender(true);
  }, []);

  return (
    <>
      <div className='addChannel-card-container'>
        <div className='addChannel-card'>
          <div className='addChannel-header'>
            <div className='addChannel-header-left'>
              <div>Create a channel</div>
            </div>

            <div
              className='addChannel-close'
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              <div className='material-symbols-outlined  '>close</div>
            </div>
          </div>

          <div className='addChannel-subHeader'>
            Channels are where your team communicates. They're best when
            organized around a topic — #marketing for example.
          </div>

          <form
            className='addChannel-form'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <div className='addChannel-form-group'>
              <label className='addChannel-form-label' htmlFor='name'>
                Name
              </label>
              {errors?.length > 0 && (
                <div className='addChannel-error-container'>
                  {errors?.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
              )}

              <input
                id='name'
                className='addChannel-form-input'
                type='text'
                value={channelName ?? ''}
                onChange={(e) =>
                  setChannelName(
                    e.target.value?.toLowerCase()?.replace(' ', '-')
                  )
                }
                placeholder='e.g. plan-budget'
                name='name'
                ref={nameInputRef}
              ></input>
              <div className='addChannel-hash-icon'></div>
              <div className='addChannel-instructions'>
                Names must be lowercase, without spaces or periods, and can’t be
                longer than 80 characters.
              </div>
            </div>

            <div className='addChannel-form-spacer'></div>

            <div className='addChannel-form-group'>
              <label className='addChannel-form-label' htmlFor='name'>
                Description <span>(optional)</span>
              </label>
              {errorsDesc?.length > 0 && (
                <div className='addChannel-error-container'>
                  {errorsDesc?.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
              )}

              <input
                id='description'
                className='addChannel-form-input description'
                type='text'
                value={channelDescription ?? ''}
                onChange={(e) => {
                  setChannelDescription(e.target.value);
                  setErrorsDesc([]);
                }}
                placeholder='Add a description'
                name='description'
              ></input>
              <div className='addChannel-instructions'>
                What's the channel about?
              </div>
            </div>

            <div className='addChannel-buttons-container'>
              <div
                className='addChannel-cancel-btn-container'
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                <div className='addChannel-cancel-btn'>Cancel</div>
              </div>

              <button
                className={`addChannel-save-btn-container ${
                  disabledCreate && 'disabledCreate'
                }`}
                type='submit'
                disabled={disabledCreate}
              >
                <div className='addChannel-save-btn'>Create</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
