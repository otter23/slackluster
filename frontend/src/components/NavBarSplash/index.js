import './NavBarSplash.css';

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';

import navLogo from '../../images/Slack_RGB_logo.svg';
// import searchIcon from '../../images/icons/search--black-icon.svg';
// import helpIcon from '../../images/icons/help-icon.svg';
// https://brandfolder.com/slack/logos

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  // const [query, setQuery] = useState('');

  let sessionLinks;
  //is user, show profile button/menu, else show login/signup links
  if (sessionUser) {
    sessionLinks = (
      <>
        {/* <li className='main-nav-notification-container'>
          <img
            className='main-nav-upload-icon'
            src={helpIcon}
            alt='help'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid meet'
          />
        </li> */}

        <li className='main-nav-userMenu'>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li className='main-nav-signup'>
          <Link to='/get-started' className='main-nav-signup-link'>
            <div>sign up</div>
          </Link>
        </li>

        <li className='main-nav-login'>
          <Link to='/login' className='main-nav-login-link'>
            log in
          </Link>
        </li>
      </>
    );
  }

  return (
    <nav className='main-nav'>
      <div className='main-nav-inner'>
        <div className='main-nav-left'>
          <NavLink exact to='/' className='main-nav-link'>
            <img
              className='main-nav-logo'
              src={navLogo}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </NavLink>

          {/* <div className='main-nav-discover'>
            <Link to='/discover' className='main-nav-discover-link'>
              Discover
            </Link>
          </div>

          <Link to='/discover' className='main-nav-search'>
            <input
              id='search'
              className='main-nav-search-input'
              type='text'
              name='search'
              placeholder='Search for artist, album, or track'
              disabled
              value={query ?? ''}
              onChange={(e) => setQuery(e.target.value)}
            />
            <img
              className='main-nav-search-icon'
              src={searchIcon}
              alt='search'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </Link> */}
        </div>

        <div className='main-nav-right'>
          <ul className='main-nav-right-list'>{sessionLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
