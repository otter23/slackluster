import './NavBarSplash.css';

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';

import navLogoMark from '../../images/Slack_Mark.svg';
// import searchIcon from '../../images/icons/search--black-icon.svg';
// import helpIcon from '../../images/icons/help-icon.svg';
// https://brandfolder.com/slack/logos

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  //is user, show profile button/menu, else show login/signup links
  if (sessionUser) {
    sessionLinks = (
      <>
        {/* <li className='nav-splash-notification-container'>
          <img
            className='nav-splash-upload-icon'
            src={helpIcon}
            alt='help'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid meet'
          />
        </li> */}

        <li className='nav-splash-userMenu'>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li className='nav-splash-signup'>
          <Link to='/get-started' className='nav-splash-signup-link'>
            <div>sign up</div>
          </Link>
        </li>

        <li className='nav-splash-login'>
          <Link to='/login' className='nav-splash-login-link'>
            log in
          </Link>
        </li>
      </>
    );
  }

  return (
    <nav className='nav-splash'>
      <div className='nav-splash-inner'>
        <div className='nav-splash-left'>
          <NavLink exact to='/' className='nav-splash-link'>
            <img
              className='nav-splash-logo'
              src={navLogoMark}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
            <div className='nav-splash-slackluster'>Slackluster</div>
          </NavLink>

          {/* <div className='nav-splash-discover'>
            <Link to='/discover' className='nav-splash-discover-link'>
              Discover
            </Link>
          </div>

          <Link to='/discover' className='nav-splash-search'>
            <input
              id='search'
              className='nav-splash-search-input'
              type='text'
              name='search'
              placeholder='Search for artist, album, or track'
              disabled
              value={query ?? ''}
              onChange={(e) => setQuery(e.target.value)}
            />
            <img
              className='nav-splash-search-icon'
              src={searchIcon}
              alt='search'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </Link> */}
        </div>

        <div className='nav-splash-right'>
          <ul className='nav-splash-right-list'>{sessionLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
