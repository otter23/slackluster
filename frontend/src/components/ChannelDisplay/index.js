import './ChannelDisplay.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';

import Chat from '../Chat';
import ChannelDetails from '../ChannelDetails';
import hashIconWhite from '../../images/icons/hash-icon-white.svg';
import FullPageModal from '../FullPageModal';

const dayjs = require('dayjs');
const dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear);

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

  //full page modal management
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

  //check whether divider should be displayed
  const displayDateDivider = (ind, message) => {
    if (ind === 0) return true;

    //.unix() called on backend to make sure server time isn't a factor
    // const prev = dayjs(dayjs.unix(messages[channelId][ind - 1].createdAt));
    // const curr = dayjs(dayjs.unix(message.createdAt));

    const prev = dayjs(messages[channelId][ind - 1].createdAt);
    const curr = dayjs(message.createdAt);

    if (dayjs(prev).isSame(curr, 'year')) {
      if (dayjs(prev).isSame(curr, 'day')) return false;
      else return true;
    } else {
      return true;
    }

    // if (prev.year() === curr.year()) {
    //   if (prev.dayOfYear() === curr.dayOfYear()) return false;
    //   else return true;
    // } else {
    //   return true;
    // }
  };

  const messageToolbox = (
    <div className='channelDisplay-message-toolbox'>
      <div className='channelDisplay-message-toolbox-edit' onClick={''}>
        <div className='material-symbols-outlined edit'>edit</div>
      </div>
      <div className='channelDisplay-message-toolbox-delete' onClick={''}>
        <div className='material-symbols-outlined delete'>delete</div>
      </div>
    </div>
  );

  console.log(
    'DEBUG HEROKU DATE',
    messages[channelId] &&
      dayjs(
        messages[channelId][messages[channelId].length - 1].createdAt
      ).format('dddd, MMMM D, YYYY h:mm A')
  );

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
              <div className='channelDisplay-message-intro'>
                <div className={`channelDisplay-message-img intro`}></div>
                <div className='channelDisplay-message-intro-text-container'>
                  <div className='channelDisplay-message-intro-text-top'>
                    <span>This is the very beginning of the&nbsp;</span>
                    {/* <span className='channelDisplay-intro-hash'></span> */}
                    <span>#&nbsp;{channels[channelId]?.name}</span>
                    <span>&nbsp;channel</span>
                  </div>
                  <div className='channelDisplay-message-intro-text-bottom'>
                    {channels[channelId]?.description}&nbsp;
                    <span
                      className='channelDisplay-message-intro-text-bottom-link'
                      onClick={openChannelInfoModal}
                    >
                      Edit Description
                    </span>
                  </div>
                </div>
              </div>

              {messages[channelId]?.map((message, ind) => (
                <>
                  {displayDateDivider(ind, message) && (
                    <div className='channelDisplay-message-day-divider'>
                      <div className='channelDisplay-message-day-divider-border'></div>
                      <div className='channelDisplay-message-day-divider-btn'>
                        {dayjs(message.createdAt).format('dddd, MMMM D')}
                      </div>
                    </div>
                  )}

                  {messages[channelId][ind - 1]?.ownerId !== message.ownerId ||
                  displayDateDivider(ind, message) ? (
                    <div
                      className={`channelDisplay-message-list-item`}
                      key={message.id}
                    >
                      <div
                        className={`channelDisplay-message-img default`}
                      ></div>

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
                      {messageToolbox}
                      {/* <div
                        className='channelDisplay-channel-edit-icon'
                        onClick={openEditChannelModal}
                      >
                        <div className='material-symbols-outlined'>edit</div>
                      </div> */}
                    </div>
                  ) : (
                    <div
                      className={`channelDisplay-message-list-item-single`}
                      key={message.id}
                    >
                      <div
                        className={`channelDisplay-message-single-timestamp`}
                      >
                        {`${dayjs(message.createdAt).format('	h:mm')}`}
                      </div>
                      <div className={`channelDisplay-message-right-single`}>
                        <div className={'channelDisplay-message-content'}>
                          {`${message.content}`}
                        </div>
                      </div>
                      {messageToolbox}
                    </div>
                  )}
                </>
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
