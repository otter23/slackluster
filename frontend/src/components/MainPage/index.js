import './MainPage.css';

import React, { useState } from 'react';

import NavBarMain from '../NavBarMain';
import SideMenu from '../SideMenu';
import ChannelDisplay from '../ChannelDisplay';
// import SidePageModal from '../SidePageModal';

export default function MainPage({ isChannelsLoaded }) {
  // const [animationToggle, setAnimationToggle] = useState(true);

  // const toggleAnimationClass = () => {
  //   setAnimationToggle((prev) => !prev);
  // };

  //state management for resizing viewport and scroll container
  // const [documentWidth, setDocumentWidth] = useState(document.body.clientWidth);
  // const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  //add global event listener for window viewport size change after first render
  // window.addEventListener('resize', () => setViewportWidth(window.innerWidth));

  const [showSideMenuModal, setSideMenuShowModal] = useState(false);
  const openSideMenuModal = () => {
    if (showSideMenuModal) return; // do nothing if modal already showing
    setSideMenuShowModal(true); // else open modal
    document.getElementById('root').classList.add('overflow'); // disable page scrolling:
  };
  // No button to close side modal
  const closeSideMenuModal = () => {
    if (!showSideMenuModal) return; // do nothing if modal already closed
    setSideMenuShowModal(false); // else close modal
    // enable page scrolling:
    document.getElementById('root').classList.remove('overflow');
  };

  return (
    <>
      <NavBarMain />
      <div className='mainPage-main-container'>
        <SideMenu
          showSideMenuModal={showSideMenuModal}
          closeSideMenuModal={closeSideMenuModal}
        />
        <ChannelDisplay
          isChannelsLoaded={isChannelsLoaded}
          openSideMenuModal={openSideMenuModal}
          closeSideMenuModal={closeSideMenuModal}
        />
      </div>
    </>
  );
}
