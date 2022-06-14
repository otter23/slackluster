import './ChannelDisplay.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';

import Chat from '../Chat';
import ChannelDetails from '../ChannelDetails';
import hashIconWhite from '../../images/icons/hash-icon-white.svg';
import FullPageModal from '../FullPageModal';

const dayjs = require('dayjs');

export default function ChannelDisplay({ isChannelsLoaded }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users.usersByUserId);
  const messages = useSelector((state) => state.messages.messagesByChannelId);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //store boolean indicating whether user is owner of currently viewed channel
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (isChannelsLoaded) {
      if (sessionUser.id === channels[channelId]?.ownerId) {
        setIsOwner(true);
      }
    }
  }, [sessionUser, isChannelsLoaded, channels, channelId]);

  //when a user deletes a channels, warn other user's who happen to be viewing it
  useEffect(() => {
    if (!isOwner && isChannelsLoaded && !channels[channelId]) {
      alert(
        `The channel you were viewing was deleted by the owner, redirected you to channel #general`
      );
      dispatch(channelsActions.setCurrentChannel(1));
    } else if (isChannelsLoaded && !channels[channelId]) {
      dispatch(channelsActions.setCurrentChannel(1));
    }
  }, [dispatch, isOwner, isChannelsLoaded, channels, channelId]);

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

      <div className='channelDisplay-main-container'>
        <div className='channelDisplay-name-bar'>
          <div
            className='channelDisplay-name-bar-btn'
            onClick={openChannelInfoModal}
          >
            <img
              src={hashIconWhite}
              alt='hash'
              className='channelDisplay-hash-icon'
            ></img>
            <div>{channels[channelId]?.name}</div>
            <div className='material-symbols-outlined channel-name-expand-icon'>
              expand_more
            </div>
          </div>
        </div>

        <div className='channelDisplay-message-container-wrapper'>
          <div className='channelDisplay-message-container-inner'>
            {/* <div className='channelDisplay-tools-bar'>sticky</div> */}

            <div className='channelDisplay-message-container'>
              {messages[channelId]?.map((message) => (
                <div
                  className={`channelDisplay-message-list-item`}
                  key={message.id}
                >
                  <div className={`channelDisplay-message-img default`}></div>
                  <div className={`channelDisplay-message-right`}>
                    <div className={`channelDisplay-message-top`}>
                      <div className={`channelDisplay-message-displayName`}>
                        {`${users[message.ownerId]?.username}`}
                      </div>
                      <div className={`channelDisplay-message-timestamp`}>
                        {`${dayjs(message.createdAt).format('	h:mm A')}`}
                      </div>
                    </div>

                    <div className={'channelDisplay-message-content'}>
                      {`${message.content}`}
                    </div>
                  </div>

                  {/* <div
                    className='channelDisplay-channel-edit-icon'
                    onClick={openEditChannelModal}
                  >
                    <div className='material-symbols-outlined'>edit</div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='channel-message-input-container'>
          <Chat channelId={channelId} />
        </div>
      </div>
    </>
  );
}
