import './SideMenu.css';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { SocketContext } from '../../context/SocketContext';

import * as channelsActions from '../../store/channels';
import * as messagesActions from '../../store/messages';

import hashIcon from '../../images/icons/hash-icon.svg';
import plusIcon from '../../images/icons/plus-icon.svg';

export default function ChannelDisplay() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.allChannels);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  useEffect(() => {
    (async () => {
      try {
        //could add a prev state holder, and then only send request if prev and current don't match
        const response = await dispatch(
          messagesActions.getChannelMessagesThunk(currentChannelId)
        );

        if (response.ok) {
          return;
        }
      } catch (errorResponse) {
        const data = await errorResponse.json();
        console.log(data);
        // if (data && data.errors) setErrors(data.errors);
      }
    })();
  }, [dispatch, currentChannelId]);

  return (
    <>
      <div className='sideMenu-main-container'>
        <div className='sideMenu-main-container-inner'>
          <div className='sideMenu-header-container'>
            <div>WorkSpace</div>
          </div>
          <div className='sideMenu-nav-container'></div>
          <div className='sideMenu-channel-container'>
            <div className='sideMenu-channel-title-btn-container'>
              <div className='sideMenu-channel-title'>Channels</div>
              <div className='sideMenu-channel-add-btn'>
                <img
                  src={plusIcon}
                  alt='hash'
                  className='sideMenu-channel-plus-icon'
                ></img>
              </div>
            </div>

            {channels?.map((channel) => (
              <div
                className={`sideMenu-channel-list-item ${
                  channel.id === currentChannelId ? 'selected' : ''
                }`}
                key={channel.id}
                onClick={() =>
                  dispatch(channelsActions.setCurrentChannel(channel.id))
                }
              >
                <img
                  src={hashIcon}
                  alt='hash'
                  className='sideMenu-channel-hash-icon'
                ></img>
                <div>{`${channel.name}`}</div>
              </div>
            ))}
          </div>
          {/* <div className='channel-tools-bar'></div> */}
          <div className='sideMenu-directMessages-container'></div>
        </div>
      </div>
    </>
  );
}
