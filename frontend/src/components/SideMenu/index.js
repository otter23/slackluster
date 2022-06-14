import './SideMenu.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as channelsActions from '../../store/channels';
import * as messagesActions from '../../store/messages';

import plusIcon from '../../images/icons/plus-icon.svg';

import FullPageModal from '../FullPageModal';
import AddChannelForm from '../AddChannelForm';

export default function SideMenu() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.allChannels);
  // const channelByChannelId = useSelector((state) => state.channels.channelByChannelId);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  //channels eager loaded once user sign's.
  // //load all channels into state, if add workspaces, should only add a workspaces channels.
  // useEffect(() => {
  //   //or just eager load default channel into state?
  //   dispatch(channelsActions.getAllChannelsThunk()).catch((res) =>
  //     console.log(res)
  //   );
  // }, []);

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
        if (errorResponse.status === 500) {
          // const resBody = await errorResponse.text();
          // console.log(resBody);
          return;
        } else if (errorResponse.status >= 400) {
          // const resBody = await errorResponse.json();
          // console.log(resBody);
          // if (data && data.errors) setErrors(data.errors);
        } else console.log(errorResponse);
      }
    })();
  }, [dispatch, currentChannelId]);

  //Modal management
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const openAddChannelModal = () => {
    if (showAddChannelModal) return; // do nothing if modal already showing
    setShowAddChannelModal(true); // else open modal
    document.getElementById('root').classList.add('overflowHidden');
  };
  const closeAddChannelModal = () => {
    if (!showAddChannelModal) return; // do nothing if modal already closed
    setShowAddChannelModal(false); // else close modal
    document.getElementById('root').classList.remove('overflowHidden');
  };

  //BAd Approach: create a style element to insert into an <object> SVG
  // const [svgCSS, setSvgCSS] = useState(1);
  // useEffect(() => {
  //   //need to select the right object based on channel if
  //   const svgObject = document.querySelector(
  //     'object.sideMenu-channel-hash-icon'
  //   );
  //   const svgDocument = svgObject?.contentDocument;
  //   const pathElem = svgDocument?.querySelector('path');
  //   pathElem?.setAttribute('stroke', 'rgba(255, 255, 255)');
  // }, [svgCSS]);

  return (
    <>
      <FullPageModal
        showModal={showAddChannelModal}
        closeModal={closeAddChannelModal}
      >
        <AddChannelForm />
      </FullPageModal>

      <div className='sideMenu-main-container'>
        <div className='sideMenu-header-container'>
          <div>WorkSpace</div>
        </div>

        <div
          className='sideMenu-channel-title-btn-container'
          onClick={openAddChannelModal}
        >
          <div className='sideMenu-channel-title'>Channels</div>
          <div className='sideMenu-channel-add-btn'>
            <img
              src={plusIcon}
              alt='plus sign'
              className='sideMenu-channel-plus-icon'
            ></img>
          </div>
        </div>

        <div className='sideMenu-main-container-wrapper'>
          <div className='sideMenu-main-container-inner'>
            {/* <div className='sideMenu-nav-container'></div> */}

            <div className='sideMenu-channel-container'>
              {channels?.map((channel) => (
                <div
                  className={`sideMenu-channel-list-item
                ${channel.id === currentChannelId ? 'selected' : ''}`}
                  key={channel.id}
                  onClick={() => {
                    dispatch(channelsActions.setCurrentChannel(channel.id));
                  }}
                >
                  <div className={`sideMenu-channel-hash-icon-container`}>
                    <div
                      className={`sideMenu-channel-hash-icon
                  ${channel.id === currentChannelId ? 'selected' : ''}`}
                    ></div>
                  </div>
                  <div
                    className={'sideMenu-channel-name'}
                  >{`${channel.name}`}</div>

                  {/* <div
                    className='sideMenu-channel-edit-icon'
                    onClick={openEditChannelModal}
                  >
                    <div className='material-symbols-outlined'>edit</div>
                  </div> */}
                </div>
              ))}
              <div
                className={`sideMenu-channel-list-item`}
                onClick={openAddChannelModal}
              >
                <div className={`sideMenu-channel-plus-icon-container`}>
                  <div className={`sideMenu-channel-plus-icon`}></div>
                </div>
                <div className={'sideMenu-channel-name'}>{`Add channels`}</div>
              </div>
            </div>
            <div className='sideMenu-bottom-add-channel-container'></div>

            {/* <div className='channel-tools-bar'></div> */}
            {/* <div className='sideMenu-directMessages-container'></div> */}
          </div>
        </div>
        {/* <div className='sideMenu-footer'>
          <div>{channelByChannelId[currentChannelId]?.name} </div>
        </div> */}
      </div>
    </>
  );
}
