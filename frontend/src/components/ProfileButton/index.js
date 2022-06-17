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
              {/* Top row */}
              <div className={`nav-user-message-list-item`}>
                <div className={`nav-user-message-img default`}></div>
                <div className={`nav-user-message-right`}>
                  <div className={`nav-user-message-top`}>
                    <div className={`nav-user-message-displayName`}>
                      {`${sessionUser.username}`}
                    </div>
                  </div>
                  <div className={'nav-user-message-content'}>
                    <div className='material-symbols-outlined brightness'>
                      brightness_1
                    </div>
                    <div className='nav-user-message-content-active'>
                      Active
                    </div>
                  </div>
                </div>
              </div>

              <div className='nav-user-dropdown-developed'>
                <div className='nav-user-dropdown-developed-text'>
                  Developed by Elan Katz
                </div>
                <div className='nav-user-dropdown-developed-images'>
                  <a
                    className='nav-user-dropdown-github'
                    href='https://github.com/otter23'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {' '}
                  </a>
                  <a
                    className='nav-user-dropdown-linked in'
                    href='https://www.linkedin.com/in/elankatz/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {' '}
                  </a>
                </div>
              </div>

              <div className='nav-user-logout'>
                <div className='nav-user-logout-btn' onClick={logout}>
                  <div className='nav-user-logout-btn-text'>
                    Sign out of Workspace
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
