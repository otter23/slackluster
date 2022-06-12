import './ChannelDisplay.css';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Chat from '../Chat';
import ChannelDetails from '../ChannelDetails';

import hashIconWhite from '../../images/icons/hash-icon-white.svg';
import FullPageModal from '../FullPageModal';

export default function ChannelDisplay() {
  // const sessionUser = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.messages.messagesByChannelId);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  const [showChannelInfoModal, setShowChannelInfoModal] = useState(false);
  const openChannelInfoModal = () => {
    if (showChannelInfoModal) return; // do nothing if modal already showing
    setShowChannelInfoModal(true); // else open modal
    document.getElementById('root').classList.add('overflowHidden');
  };
  const closeChannelInfoModal = () => {
    if (!showChannelInfoModal) return; // do nothing if modal already closed
    setShowChannelInfoModal(false); // else close modal
    document.getElementById('root').classList.remove('overflowHidden');
  };

  return (
    <>
      <FullPageModal
        showModal={showChannelInfoModal}
        closeModal={closeChannelInfoModal}
      >
        <ChannelDetails />
      </FullPageModal>

      <div className='channel-main-container'>
        <div className='channel-name-bar'>
          <div className='channel-name-bar-btn' onClick={openChannelInfoModal}>
            <img
              src={hashIconWhite}
              alt='hash'
              className='channel-hash-icon'
            ></img>
            <div>{channels[channelId]?.name}</div>
            <div class='material-symbols-outlined channel-name-expand-icon'>
              expand_more
            </div>
          </div>
        </div>
        <div className='channel-main-container-inner'>
          {/* <div className='channel-tools-bar'></div> */}
          <div className='channel-messages-container'>
            {messages[channelId]?.map((message) => (
              <div className='chat-message-container' key={message.id}>
                {`${message.ownerId ? `User ${message.ownerId} - ` : ''}${
                  message.content
                }`}
              </div>
            ))}
          </div>

          <div className='channel-message-input-container'>
            <Chat channelId={channelId} />
          </div>
        </div>
      </div>
    </>
  );
}
