import './ChannelDetails.css';

import dayjs from 'dayjs';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import FullPageModal from '../FullPageModal';

import EditChannelName from '../EditChannelForms/EditChannelName';
import EditChannelDescription from '../EditChannelForms/EditChannelDescription';
import EditChannelTopic from '../EditChannelForms/EditChannelTopic';
import DeleteChannel from '../EditChannelForms/DeleteChannel';

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
        {formSelection === 'delete' && (
          <DeleteChannel closeDetailsModal={closeModal} />
        )}
      </FullPageModal>

      <div className='channelDetails-card-container'>
        <div className='channelDetails-card'>
          <div className='channelDetails-header'>
            <div className='channelDetails-header-left'>
              <span>
                <div className='channelDetails-header-icon'></div>
                <span className='channelDetails-header-name'>
                  &nbsp;{channels[channelId]?.name}
                </span>
              </span>
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
                sessionUser.id === channels[channelId]?.ownerId &&
                channels[channelId].name !== 'general'
                  ? 'editable'
                  : 'noEdit'
              }`}
              onClick={() => {
                setFormSelection('name');
                openEditChannelModal();
              }}
            >
              <div>Channel name</div>
              <div className='channelDetails-card-field-row-two'>
                <span>
                  <div className='channelDetails-card-field-icon'></div>

                  <span className='channelDetails-card-field-name'>
                    &nbsp;{channels[channelId]?.name}
                  </span>
                </span>
              </div>
              {sessionUser.id === channels[channelId]?.ownerId &&
                channels[channelId].name !== 'general' && (
                  <div className='channelDetails-card-field-edit'>Edit</div>
                )}
            </div>

            <div className='channelDetails-card-spacer'></div>

            <div
              className={`channelDetails-card-field-container topic editable`}
              onClick={() => {
                setFormSelection('topic');
                openEditChannelModal();
              }}
            >
              <div>Topic</div>
              <pre className='channelDetails-card-field-row-two'>
                {channels[channelId]?.topic ? (
                  <div>{channels[channelId]?.topic}</div>
                ) : (
                  <div className='channelDetails-card-placeholder'>
                    Add a topic
                  </div>
                )}
              </pre>

              <div className='channelDetails-card-field-edit'>Edit</div>
            </div>

            <div
              className={`channelDetails-card-field-container description editable`}
              onClick={() => {
                setFormSelection('description');
                openEditChannelModal();
              }}
            >
              <div>Description</div>
              <pre className='channelDetails-card-field-row-two'>
                {channels[channelId]?.description ? (
                  <div>{channels[channelId]?.description}</div>
                ) : (
                  <div className='channelDetails-card-placeholder'>
                    Add a description
                  </div>
                )}
              </pre>

              <div className='channelDetails-card-field-edit'>Edit</div>
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
                  users[channels[channelId]?.ownerId]?.username
                } on ${dayjs(channels[channelId]?.createdAt).format(
                  'MMMM D, YYYY'
                )}`}</div>
              </div>
            </div>

            <div className='channelDetails-card-spacer'></div>

            {sessionUser.id === channels[channelId]?.ownerId &&
              channels[channelId].name !== 'general' && (
                <div
                  className={`channelDetails-card-field-container delete editable`}
                  onClick={() => {
                    setFormSelection('delete');
                    openEditChannelModal();
                  }}
                >
                  <div className='channelDetails-card-delete-header'>
                    Delete this channel
                  </div>
                  <div className='channelDetails-card-field-row-two'>
                    <div className='channelDetails-card-placeholder'>
                      Deleting this channel will permanently remove all of its
                      messages. This cannot be undone.
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
