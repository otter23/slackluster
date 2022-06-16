import './ChannelDisplay.css';

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';

import AddMessage from '../AddMessage';
import EditMessage from '../EditMessage';
import DeleteMessage from '../DeleteMessageForm';
import ChannelDetails from '../ChannelDetails';
import hashIconWhite from '../../images/icons/hash-icon-white.svg';
import FullPageModal from '../FullPageModal';

const dayjs = require('dayjs');
const dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear);

export default function ChannelDisplay({
  isChannelsLoaded,
  openSideMenuModal,
}) {
  const dispatch = useDispatch();

  //references used for resizing purposes
  const addMessageBox = useRef(null);
  const messagesBox = useRef(null);
  const channelScroll = useRef(null);

  //redux State subscriptions
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users.usersByUserId);
  const messages = useSelector((state) => state.messages.messagesByChannelId);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  const [currentMessage, setCurrentMessage] = useState(null);
  const [editMessageDisplay, setEditMEssageDisplay] = useState(false);

  //cancel edit message click handler
  const closeEditMessage = () => {
    setEditMEssageDisplay(false);
    setCurrentMessage(null);
  };

  //cancel delete message click handler
  const closeDeleteMessage = () => {
    setCurrentMessage(null);
  };

  //store boolean indicating whether user is owner of currently viewed channel
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (isChannelsLoaded && sessionUser) {
      if (sessionUser.id === channels[channelId]?.ownerId) setIsOwner(true);
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

  //check whether divider should be displayed
  const displayDateDivider = (ind, message) => {
    if (ind === 0) return true;

    //can call .unix()  on backend to make sure server time isn't a factor
    //only an issue in python, not in javascript backend
    // const curr = dayjs(dayjs.unix(message.createdAt));

    const prev = dayjs(messages[channelId][ind - 1]?.createdAt);
    const curr = dayjs(message?.createdAt);

    if (dayjs(prev)?.isSame(curr, 'year')) {
      if (dayjs(prev)?.isSame(curr, 'day')) return false;
      else return true;
    } else return true;

    // if (prev.year() === curr.year()) {
    //   if (prev.dayOfYear() === curr.dayOfYear()) return false;
    //   else return true;
    // } else {
    //   return true;
    // }
  };

  //Function to scroll to bottom (e.g. after submit)
  const scrollToBottom = () => {
    const channelScroll = document.querySelector(
      '.channelDisplay-message-container-inner'
    );
    //prettier-ignore
    // channelScroll.scrollTop = channelScroll.scrollHeight- channelScroll.clientHeight
    channelScroll.scrollTop = channelScroll.scrollHeight;
    // channelScroll.scrollIntoView();
  };

  //state management for resizing viewport and scroll container
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  // const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [scrollBottom, setScrollBottom] = useState(null);

  //only set scroll even listener once channelScroll exists
  useEffect(() => {
    if (channelScroll) {
      //set scrollBottom when scroll updates
      channelScroll.current.onscroll = () => {
        setScrollBottom(
          channelScroll.current.scrollHeight -
            channelScroll.current.scrollTop ===
            channelScroll.current.clientHeight
        );
      };
    }
  }, [channelScroll]);

  //add global event listener for window viewport size change
  window.onresize = () => setViewportHeight(window.innerHeight);

  //dynamically update height of scroll container based on viewport height and scroll status
  useEffect(() => {
    if (addMessageBox && messagesBox) {
      // let viewportHeight = window.innerHeight;
      let addMessageBoxHeight = addMessageBox.current?.offsetHeight;
      messagesBox.current.style.height = `${
        viewportHeight - 95 - addMessageBoxHeight
      }px`;
    }

    //if already at bottom, stay at bottom, else return
    if (scrollBottom)
      channelScroll.current.scrollTop = channelScroll.current.scrollHeight;
    else return;
  }, [addMessageBox, messagesBox, viewportHeight, scrollBottom]);

  //dynamically update height of scroll container based on input container size
  //updates height when user changes to another channel bc input gets resized
  useEffect(() => {
    if (addMessageBox && messagesBox) {
      let viewportHeight = window.innerHeight;
      let addMessageBoxHeight = addMessageBox.current?.offsetHeight;
      messagesBox.current.style.height = `${
        viewportHeight - 95 - addMessageBoxHeight
      }px`;
    }
    scrollToBottom();
  }, [addMessageBox, messagesBox, channelId]);

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

  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const openDeleteMessageModal = () => {
    if (showDeleteMessageModal) return; // do nothing if modal already showing
    setShowDeleteMessageModal(true); // else open modal
    document.getElementById('root').classList.add('overflowHidden');
  };
  const closeDeleteMessageModal = () => {
    if (!showDeleteMessageModal) return; // do nothing if modal already closed
    setShowDeleteMessageModal(false); // else close modal
    document.getElementById('root').classList.remove('overflowHidden');
  };

  // console.log(
  //   'DEBUG HEROKU DATE',
  //   messages[channelId] &&
  //     dayjs(
  //       messages[channelId][messages[channelId]?.length - 1]?.createdAt
  //     )?.format('dddd, MMMM D, YYYY h:mm A')
  // );

  return (
    <>
      <FullPageModal
        showModal={showChannelInfoModal}
        closeModal={closeChannelInfoModal}
      >
        <ChannelDetails />
      </FullPageModal>

      <FullPageModal
        showModal={showDeleteMessageModal}
        closeModal={closeDeleteMessageModal}
      >
        <DeleteMessage
          message={currentMessage}
          closeDeleteMessage={closeDeleteMessage}
        />
      </FullPageModal>

      <div className='channelDisplay-main-container'>
        <div className='channelDisplay-name-bar'>
          <div
            className='channelDisplay-sideMenu-toggle'
            onClick={openSideMenuModal}
          >
            <span className='material-symbols-outlined'>menu</span>
          </div>

          <div
            className='channelDisplay-name-bar-btn'
            onClick={openChannelInfoModal}
          >
            <img
              src={hashIconWhite}
              alt='hash'
              className='channelDisplay-hash-icon'
            ></img>
            <div className='channelDisplay-name-bar-btn-text'>
              {channels[channelId]?.name}
            </div>
            <div className='material-symbols-outlined channel-name-expand-icon'>
              expand_more
            </div>
          </div>
        </div>

        <div
          className='channelDisplay-message-container-wrapper'
          ref={messagesBox}
        >
          <div
            className='channelDisplay-message-container-inner'
            ref={channelScroll}
          >
            {/* <div className='channelDisplay-tools-bar'>sticky</div> */}

            <div className='channelDisplay-message-container'>
              <div className='channelDisplay-message-intro'>
                <div className={`channelDisplay-message-img intro`}></div>
                <div className='channelDisplay-message-intro-text-container'>
                  <div className='channelDisplay-message-intro-text-top'>
                    {/* <span className='channelDisplay-intro-hash'></span> */}
                    <span>
                      This is the very beginning of the &#8203;
                      <span className='channelDisplay-message-intro-text-top-name'>
                        #&nbsp;{channels[channelId]?.name}
                      </span>
                      &nbsp;channel
                    </span>
                  </div>
                  <div className='channelDisplay-message-intro-text-bottom'>
                    <span>
                      <span>{channels[channelId]?.description}&nbsp;</span>
                      <span
                        className='channelDisplay-message-intro-text-bottom-link'
                        onClick={openChannelInfoModal}
                      >
                        Edit Description
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {messages[channelId]?.map((message, ind) => (
                <>
                  {displayDateDivider(ind, message) && (
                    <div
                      className='channelDisplay-message-day-divider'
                      key={dayjs(message.createdAt).unix()}
                    >
                      <div className='channelDisplay-message-day-divider-border'></div>
                      <div className='channelDisplay-message-day-divider-btn'>
                        {dayjs(message.createdAt).format('dddd, MMMM D')}
                      </div>
                    </div>
                  )}

                  {/* Toggle whether user profile message style is shown or not */}
                  {messages[channelId][ind - 1]?.ownerId !== message.ownerId ||
                  displayDateDivider(ind, message) ? (
                    <div
                      className={`channelDisplay-message-list-item current-${message.id}`}
                      key={message.id}
                    >
                      <div
                        className={`channelDisplay-message-img default`}
                      ></div>

                      <div
                        className={`channelDisplay-message-right ${
                          currentMessage &&
                          currentMessage?.id === message.id &&
                          'edit'
                        }`}
                      >
                        {/* toggle whether edit form is shown */}
                        {editMessageDisplay &&
                        currentMessage?.id === message.id ? (
                          <EditMessage
                            message={message}
                            closeEditMessage={closeEditMessage}
                            openDeleteMessageModal={openDeleteMessageModal}
                          />
                        ) : (
                          <>
                            <div className={`channelDisplay-message-top`}>
                              <div
                                className={`channelDisplay-message-displayName`}
                              >
                                {`${users[message.ownerId]?.username}`}
                              </div>

                              <div
                                className={`channelDisplay-message-timestamp`}
                              >
                                {`${dayjs(message.createdAt).format('	h:mm A')}`}
                              </div>
                            </div>
                            <pre className={'channelDisplay-message-content'}>
                              {`${message.content}`}
                            </pre>
                          </>
                        )}
                      </div>

                      {/* {messageToolbox} */}
                      {/* Only show toolbox if user is owner */}
                      {sessionUser?.id === message?.ownerId && (
                        <div className='channelDisplay-message-toolbox'>
                          <div
                            className='channelDisplay-message-toolbox-edit'
                            onClick={() => {
                              setCurrentMessage(message);
                              setEditMEssageDisplay(true);
                              const mainView = document.querySelector(
                                `.channelDisplay-message-list-item.current-${message.id}`
                              );
                              mainView.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                              });
                            }}
                          >
                            <div className='material-symbols-outlined edit'>
                              edit
                            </div>
                          </div>
                          <div
                            className='channelDisplay-message-toolbox-delete'
                            onClick={() => {
                              setCurrentMessage(message);
                              openDeleteMessageModal();
                            }}
                          >
                            <div className='material-symbols-outlined delete'>
                              delete
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`channelDisplay-message-list-item-single
                      current-${message.id}
                       ${
                         currentMessage &&
                         currentMessage?.id === message.id &&
                         'edit'
                       }`}
                      key={message.id}
                    >
                      <div
                        className={`channelDisplay-message-single-timestamp`}
                      >
                        {`${dayjs(message.createdAt).format('	h:mm')}`}
                      </div>
                      <div className={`channelDisplay-message-right-single`}>
                        {/* toggle whether edit form is shown */}
                        {editMessageDisplay &&
                        currentMessage?.id === message.id ? (
                          <EditMessage
                            message={message}
                            closeEditMessage={closeEditMessage}
                            openDeleteMessageModal={openDeleteMessageModal}
                          />
                        ) : (
                          <pre className={'channelDisplay-message-content'}>
                            {`${message.content}`}
                          </pre>
                        )}
                      </div>
                      {/* {messageToolbox} */}
                      {/* Only show toolbox if user is owner */}
                      {sessionUser?.id === message?.ownerId && (
                        <div className='channelDisplay-message-toolbox'>
                          <div
                            className='channelDisplay-message-toolbox-edit'
                            onClick={() => {
                              setCurrentMessage(message);
                              setEditMEssageDisplay(true);
                              const mainView = document.querySelector(
                                `.channelDisplay-message-list-item-single.current-${message.id}`
                              );
                              mainView?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                                // inline: 'nearest',
                              });
                              // console.log(
                              //   'BOTTOM',
                              //   messages[channelId]?.length - 1 === ind
                              // );
                              // if (messages[channelId]?.length - 1 === ind)
                              //   scrollToBottom();
                            }}
                          >
                            <div className='material-symbols-outlined edit'>
                              edit
                            </div>
                          </div>
                          <div
                            className='channelDisplay-message-toolbox-delete'
                            onClick={() => {
                              setCurrentMessage(message);
                              openDeleteMessageModal();
                            }}
                          >
                            <div className='material-symbols-outlined delete'>
                              delete
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
        <div className='channel-message-input-container' ref={addMessageBox}>
          <AddMessage
            channelId={channelId}
            addMessageBox={addMessageBox}
            messagesBox={messagesBox}
            scrollToBottom={scrollToBottom}
            scrollBottom={scrollBottom}
          />
        </div>
      </div>
    </>
  );
}
