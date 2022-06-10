import './ChannelDisplay.css';

import React from 'react';
import { useSelector } from 'react-redux';

import Chat from '../Chat';

export default function ChannelDisplay() {
  const sessionUser = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.messages.messagesByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  if (!sessionUser) return null;

  return (
    <>
      <div className='channel-main-container'>
        <div className='channel-main-container-inner'>
          <div className='channel-name-bar'></div>
          {/* <div className='channel-tools-bar'></div> */}
          <div className='channel-messages-container'>
            {messages[channelId]?.map((message, ind) => (
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
