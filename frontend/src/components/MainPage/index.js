import './MainPage.css';

import React from 'react';

import NavBarMain from '../NavBarMain';
import SideMenu from '../SideMenu';
import ChannelDisplay from '../ChannelDisplay';

export default function MainPage() {
  return (
    <>
      <NavBarMain />
      <div className='mainPage-main-container'>
        <SideMenu />
        <ChannelDisplay />
      </div>
    </>
  );
}
