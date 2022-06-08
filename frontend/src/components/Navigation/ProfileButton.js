import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import userIcon from '../../images/demoUser-icon-small.jpg';

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const menu = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  //dropdown click handler
  const openMenu = () => {
    //do nothing if menu already showed
    if (showMenu) return;
    setShowMenu(true);
  };

  //Check status of menu
  useEffect(() => {
    //if menu already closed do nothing
    if (!showMenu) return;

    const closeMenu = ({ target }) => {
      //     setShowMenu(false);
      //could do something wih "activeElement instead
      if (target !== menu.current && !menu.current?.contains(target)) {
        setShowMenu((prev) => !prev);
      }
    };
    //add event listener to entire document
    document.addEventListener('click', closeMenu);

    //cleanup function
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  //logout click handler
  const logout = (e) => {
    e.preventDefault();

    //removes user from jwt cookie
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div
        className='nav-user-icon-container'
        onClick={openMenu}
        style={{ backgroundImage: `url(${userIcon})` }}
      >
        {/* <button className='nav-user-icon' onClick={openMenu}>
          Welcome {user.username}
        </button> */}
        {/* <div class='material-symbols-outlined'>photo_camera</div> */}

        {showMenu && (
          <>
            <div className='nav-user-dropdown-arrow'></div>
            <div className='nav-user-dropdown-container' ref={menu}>
              <div className='nav-user-dropdown-upper'>
                Welcome {user.username}!
              </div>
              <div className='nav-user-logout'>
                <button
                  className='nav-user-logout-btn'
                  type='button'
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
