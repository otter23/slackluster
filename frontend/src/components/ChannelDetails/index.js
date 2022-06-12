import './ChannelDetails.css';

import dayjs from 'dayjs';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import FullPageModal from '../FullPageModal';
import EditChannelName from '../EditChannelFields/EditChannelName';
import EditChannelDescription from '../EditChannelFields/EditChannelDescription';
import EditChannelTopic from '../EditChannelFields/EditChannelTopic';

import hashIcon from '../../images/icons/hash-icon-offWhite.svg';

export default function ChannelDetails({ closeModal }) {
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users.usersByUserId);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //slices of react state for controlled inputs
  const [navRow, setNavRow] = useState('about');

  const [formSelection, setFormSelection] = useState(null);

  //Modal management
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);
  const openEditChannelModal = () => {
    if (showEditChannelModal) return; // do nothing if modal already showing
    setShowEditChannelModal(true); // else open modal
    document.getElementById('root').classList.add('overflowHidden');
  };
  const closeEditChannelModal = () => {
    if (!showEditChannelModal) return; // do nothing if modal already closed
    setShowEditChannelModal(false); // else close modal
    document.getElementById('root').classList.remove('overflowHidden');
  };

  return (
    <>
      <FullPageModal
        showModal={showEditChannelModal}
        closeModal={closeEditChannelModal}
      >
        {formSelection === 'name' && <EditChannelName />}
        {formSelection === 'topic' && <EditChannelTopic />}
        {formSelection === 'description' && <EditChannelDescription />}
      </FullPageModal>

      <div className='channelDetails-card-container'>
        <div className='channelDetails-card'>
          <div className='channelDetails-header'>
            <div className='channelDetails-header-left'>
              <img
                src={hashIcon}
                alt='hash'
                className='channelDetails-hash-icon'
              ></img>
              <div>{channels[channelId]?.name}</div>
            </div>
            <div className='channelDetails-close' onClick={closeModal}>
              <div className='material-symbols-outlined  '>close</div>
            </div>
          </div>

          <div className='channelDetails-row-two'>
            <ul className='channelDetails-row-two-inner'>
              <li className='channelDetails-about'>
                <div
                  className={`channelDetails-inactive
                ${navRow === 'about' ? 'channelDetails-active' : ''}`}
                  onClick={() => setNavRow('about')}
                >
                  <span>About</span>
                </div>
              </li>
              <li className='channelDetails-members'>
                <div
                  className={`channelDetails-inactive
                ${navRow === 'members' ? 'channelDetails-active' : ''}`}
                  onClick={() => setNavRow('members')}
                >
                  <span>Members</span>
                </div>
              </li>
            </ul>
          </div>

          <div className='channelDetails-card-bottom'>
            <div
              className={`channelDetails-card-field-container ${
                sessionUser.id === channels[channelId]?.ownerId
                  ? 'editable'
                  : ''
              }`}
              onClick={() => {
                setFormSelection('name');
                openEditChannelModal();
              }}
            >
              <div>Channel name</div>
              <div className='channelDetails-card-field-row-two'>
                <img
                  src={hashIcon}
                  alt='hash'
                  className='channelDetails-card-field-icon'
                ></img>
                <div>{channels[channelId]?.name}</div>
              </div>
              {sessionUser.id === channels[channelId]?.ownerId && (
                <div className='channelDetails-card-field-edit'>Edit</div>
              )}
            </div>
            <div className='channelDetails-card-spacer'></div>

            <div
              className={`channelDetails-card-field-container topic ${
                sessionUser.id === channels[channelId]?.ownerId
                  ? 'editable'
                  : ''
              }`}
              onClick={() => {
                setFormSelection('topic');
                openEditChannelModal();
              }}
            >
              <div>Topic</div>
              <div className='channelDetails-card-field-row-two'>
                {channels[channelId]?.topic ? (
                  <div>{channels[channelId]?.topic}</div>
                ) : (
                  <div className='channelDetails-card-placeholder'>
                    Add a topic
                  </div>
                )}
              </div>
              {sessionUser.id === channels[channelId]?.ownerId && (
                <div className='channelDetails-card-field-edit'>Edit</div>
              )}
            </div>

            <div
              className={`channelDetails-card-field-container description ${
                sessionUser.id === channels[channelId]?.ownerId
                  ? 'editable'
                  : ''
              }`}
              onClick={() => {
                setFormSelection('description');
                openEditChannelModal();
              }}
            >
              <div>Description</div>
              <div className='channelDetails-card-field-row-two'>
                {channels[channelId]?.desription ? (
                  <div>{channels[channelId]?.desription}</div>
                ) : (
                  <div className='channelDetails-card-placeholder'>
                    Add a description
                  </div>
                )}
              </div>
              {sessionUser.id === channels[channelId]?.ownerId && (
                <div className='channelDetails-card-field-edit'>Edit</div>
              )}
            </div>

            <div
              className={`channelDetails-card-field-container created ${
                sessionUser.id === channels[channelId]?.ownerId
                  ? 'editable'
                  : ''
              }`}
            >
              <div>Created by</div>
              <div className='channelDetails-card-field-row-two'>
                <div>{`${
                  users[channels[channelId]?.ownerId].username
                } on ${dayjs(channels[channelId]?.createdAt).format(
                  'MMMM D, YYYY'
                )}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
