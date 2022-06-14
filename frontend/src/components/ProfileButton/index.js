import './ProfileButton.css';

import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

import defaultProfile from '../../images/slack-default-profile.png';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

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
    alert("You've been successfully logged out.");
  };

  return (
    <div className='nav-user-image-container' onClick={openMenu}>
      <div
        className='nav-user-image'
        style={
          sessionUser?.profileImageUrl
            ? {
                backgroundImage: `url(${sessionUser?.profileImageUrl})`,
              }
            : { backgroundImage: `url(${defaultProfile})` }
        }
      >
        {showMenu && (
          <>
            <div className='nav-user-dropdown-container' ref={menu}>
              <div className='nav-user-dropdown-welcome'>
                <div className='nav-user-dropdown-welcome-text'>
                  Welcome {user?.username}!
                </div>
              </div>

              <div className='nav-user-dropdown-welcome'>
                <div className='nav-user-dropdown-welcome-text'>
                  Developed by Elan Katz
                </div>
              </div>

              {/* {sessionUser && (
                <Link
                  className='nav-user-dropdown-artist-link'
                  to={`/${sessionUser?.artistUrl}`}
                >
                  <div>Artist Profile Page</div>
                </Link>
              )} */}

              <div className='nav-user-logout'>
                <button
                  className='nav-user-logout-btn'
                  type='button'
                  onClick={logout}
                >
                  Sign Out of Workspace
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
