import './EditChannel.css';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';

export default function DeleteChannel({ closeModal, closeDetailsModal }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //slices of react state for controlled inputs
  const [deleteChannel, setDeleteChannel] = useState(false);
  const [disabledDelete, setDisabledDelete] = useState(true);

  const [errors, setErrors] = useState([]);

  //submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state
    setDeleteChannel(false);
    setDisabledDelete(true);

    try {
      const response = await dispatch(
        channelsActions.deleteChannelThunk(sessionUser.id, channelId)
      );
      if (response.ok) {
        closeModal();
        closeDetailsModal();
        alert(
          `Channel #${channels[channelId]?.name} successfully deleted, redirecting to channel #general`
        );
        // return <Redirect to={`/photos/${userId}`} />;
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
      console.log('TEST');
    }
  };

  return (
    <>
      <div className='editChannel-card-container'>
        <div className='editChannel-card'>
          <div className='editChannel-header'>
            <div className='editChannel-header-left delete'>
              {/* <span> */}
              <span>Delete&nbsp;</span>
              {/* <div className='editChannel-header-icon'></div> */}
              {/* </span> */}
              <div> #&nbsp;{channels[channelId]?.name} </div>
            </div>
            <div className='editChannel-close' onClick={closeModal}>
              <div className='material-symbols-outlined  '>close</div>
            </div>
          </div>

          <form
            className='editChannel-form'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <div className='editChannel-subheader'>
              <span>Are you sure you want to delete&nbsp;</span>
              <span className='editChannel-subheader-name'>
                #{channels[channelId]?.name}
              </span>
              <span>
                ? All of the channel's messages will be removed from Slackluster
                immediately — files, however, will not be deleted. This cannot
                be undone.
              </span>
            </div>
            <div className='editChannel-form-group'>
              <label className='editChannel-form-label' htmlFor='delete'>
                {errors.length > 0 && (
                  <div className='editChannel-error-container'>
                    {errors.map((error, ind) => (
                      <div key={ind}>{error}</div>
                    ))}
                  </div>
                )}

                <input
                  id='delete'
                  className='editChannel-form-input-delete'
                  type='checkbox'
                  name='delete'
                  value='delete'
                  checked={deleteChannel}
                  onChange={(e) => {
                    setDeleteChannel((prevVal) => !prevVal);
                    setDisabledDelete((prevVal) => !prevVal);
                  }}
                ></input>
                <span> Yes, permanently delete this channel</span>
              </label>
            </div>

            <div className='editChannel-buttons-container'>
              <div className='editChannel-cancel-btn-container'>
                <button
                  className='editChannel-cancel-btn'
                  type='button'
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>

              <div
                className={`editChannel-delete-btn-container ${
                  disabledDelete && 'disabledDelete'
                }`}
              >
                <button
                  className='editChannel-delete-btn'
                  type='submit'
                  disabled={disabledDelete}
                >
                  Delete Channel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
