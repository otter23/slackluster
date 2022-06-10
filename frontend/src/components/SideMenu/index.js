import './SideMenu.css';

import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { SocketContext } from '../../context/SocketContext';

// import * as messagesActions from '../../store/messages';

export default function ChannelDisplay() {
  // const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.allChannels);

  return (
    <>
      <div className='sideMenu-main-container'>
        <div className='sideMenu-main-container-inner'>
          <div className='sideMenu-nav-container'></div>
          <div className='sideMenu-channel-container'>
            <div className='sideMenu-channel-title-btn-container'>
              <div className='sideMenu-channel-title'>Channels</div>
              <div className='sideMenu-channel-add-btn'>+</div>
            </div>
            {channels?.map((channel, ind) => (
              <div className='sideMenu-channel-container' key={channel.id}>
                {`${channel.name}`}
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
