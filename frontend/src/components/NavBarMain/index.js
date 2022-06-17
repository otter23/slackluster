import './NavBarMain.css';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';

// import navDarkLogo from '../../images/Slack_RGB_White.svg';
import navDarkMarkLogo from '../../images/Slack_Mark.svg';

// import searchIcon from '../../images/icons/search--black-icon.svg';
// import helpIcon from '../../images/icons/help-icon.svg';
// https://brandfolder.com/slack/logos

export default function NavBarMain() {
  const sessionUser = useSelector((state) => state.session.user);

  // const [query, setQuery] = useState('');

  return (
    <nav className='nav-main-container'>
      <div className='nav-main-container-inner'>
        <div className='nav-main-left'>
          <NavLink exact to='/' className='nav-main-link'>
            <img
              className='nav-main-logo'
              src={navDarkMarkLogo}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
            <div className='nav-main-slackluster'>Slackluster</div>
          </NavLink>

          {/* <div className='nav-main--discover'>
            <Link to='/discover' className='nav-main-discover-link'>
              Discover
            </Link>
          </div>

          <Link to='/discover' className='nav-main-search'>
            <input
              id='search'
              className='nav-main-search-input'
              type='text'
              name='search'
              placeholder='Search for artist, album, or track'
              disabled
              value={query ?? ''}
              onChange={(e) => setQuery(e.target.value)}
            />
            <img
              className='nav-main-search-icon'
              src={searchIcon}
              alt='search'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </Link> */}
        </div>

        <div className='nav-main-right'>
          <ul className='nav-main-right-list'>
            <li className='nav-main-profile-btn'>
              <ProfileButton user={sessionUser} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
