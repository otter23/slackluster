import './MainPage.css';

import React from 'react';
import { useSelector } from 'react-redux';

import SideMenu from '../SideMenu';
import ChannelDisplay from '../ChannelDisplay';

export default function MainPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const channelId = useSelector((state) => state.channels.currentChannel);

  if (!sessionUser) return null;

  return (
    <div className='mainPage-main-container'>
      <SideMenu />
      <ChannelDisplay channelId={channelId} />
    </div>
  );
}
