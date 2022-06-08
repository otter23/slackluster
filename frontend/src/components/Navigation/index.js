import './Navigation.css';

import React, { useEffect, useState } from 'react';
import { NavLink, Link, Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import flickrLogo from '../../images/n_flickr_logo.svg';
import flickrLogoColored from '../../images/n_flickr_logo_colored.svg';

import uploadIcon from '../../images/icons/upload-icon.svg';
import searchIcon from '../../images/icons/search-blue-icon.svg';
import notificationsIcon from '../../images/icons/notifications-icon.svg';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [userProfile, setUserProfile] = useState(false);
  const [explore, setExplore] = useState(true);

  const location = useLocation();
  const userProfileRegex = /\/photos\/\d+$/;
  const exploreRegex = /\/explore$/;

  useEffect(() => {
    if (userProfileRegex.test(location.pathname)) setUserProfile(true);
  }, []);

  useEffect(() => {
    if (exploreRegex.test(location.pathname)) setExplore(false);
  }, []);

  let userId;
  if (sessionUser) {
    userId = sessionUser.id;
  }

  let sessionLinks;
  //is user, show profile button/menu, else show login/signup links
  if (sessionUser) {
    sessionLinks = (
      <>
        {explore && (
          <li className='main-nav-search'>
            <Link to='/explore' className='main-nav-icon-container'>
              <img
                className='main-nav-search-icon'
                src={searchIcon}
                alt='logo'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid meet'
              />
            </Link>
          </li>
        )}

        <li className='main-nav-upload'>
          <Link to={`/photos/upload`} className='main-nav-icon-container'>
            <img
              className='main-nav-upload-icon'
              src={uploadIcon}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </Link>
        </li>

        <li className='main-nav-notification'>
          <div className='main-nav-icon-container'>
            <img
              className='main-nav-upload-icon'
              src={notificationsIcon}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </div>
        </li>
        <li className='main-nav-userMenu'>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        {explore && (
          <li className='main-nav-search'>
            <Link to='/explore' className='main-nav-icon-container'>
              <img
                className='main-nav-search-icon'
                src={searchIcon}
                alt='logo'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid meet'
              />
            </Link>
          </li>
        )}
        <li className='main-nav-login'>
          <div>
            <Link to='/login'>Log In</Link>
          </div>
        </li>
        <li>
          <div className='main-nav-signup-btn-container'>
            <button className='main-nav-signup-btn' type='button'>
              <Link to='/sign-up'>Sign Up</Link>
            </button>
          </div>
        </li>
      </>
    );
  }

  const mainNav = (
    <nav className='main-nav'>
      <div className='main-nav-inner'>
        <div className='main-nav-left'>
          <div className='main-nav-menu'></div>
          <NavLink exact to='/' className='main-nav-link'>
            <img
              className='main-nav-logo'
              src={flickrLogo}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </NavLink>
          {/* && !userProfile */}
          {sessionUser && (
            <div className='main-nav-photostream'>
              <Link to={`/photos/${sessionUser?.id}`}> Your Photostream </Link>
            </div>
          )}
        </div>

        <div className='main-nav-right'>
          <ul className='main-nav-right-list'>{sessionLinks}</ul>
        </div>
      </div>
    </nav>
  );

  const splashNav = (
    <nav className='splash-nav'>
      <div className='splash-nav-inner'>
        <div className='splash-left-nav'>
          <NavLink exact to='/'>
            <img
              className='splash-nav-logo'
              src={flickrLogo}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </NavLink>
        </div>

        <div className='splash-nav-right'>
          {/* updated from div to Link */}
          <div className='splash-nav-search-div'>
            <form className='splash-nav-search-form'>
              <Link to='/explore' className='splash-nav-search-link'>
                <label></label>
                <div className='material-icons splash-search-icon'>search</div>
                <input
                  type='search'
                  placeholder='Photos, people, or groups'
                  disabled={true}
                ></input>
              </Link>
            </form>
          </div>

          <div>
            <Link className='splash-login' to='/login'>
              Log In
            </Link>
          </div>

          <div>
            <Link className='splash-signup' to='/sign-up'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  const photosUploadNav = (
    <nav className='upload-nav'>
      <div className='upload-nav-inner'>
        <Link to='/' className='upload-nav-link'>
          <img
            className='upload-nav-logo'
            src={
              flickrLogoColored
              // 'https://combo.staticflickr.com/pw/images/flickr-logo-small.png'
            }
            alt='logo'
          />
        </Link>
        <div className='upload-nav-right-container'>
          <ul className='upload-nav-left'>
            <li>
              <Link className='upload-nav-photostream' to={`/photos/${userId}`}>
                Your Photostream
              </Link>
            </li>
            <li>
              <Link className='upload-nav-create' to={`#`}>
                Create
              </Link>
            </li>
          </ul>
          <ul className='upload-nav-right'>
            <li>
              <Link className='upload-nav-oldUploadr' to={`#`}>
                Old Uploadr
              </Link>
            </li>
            <li>
              <Link className='upload-nav-newHere' to={`#`}>
                New Here?
              </Link>
            </li>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const authNav = (
    <nav className='auth-nav'>
      <div className='auth-nav-inner'>
        <Link to='/' className='auth-nav-link'>
          <img
            className='auth-nav-logo'
            src={flickrLogo}
            alt='logo'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid meet'
          />
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      <Switch>
        <Route exact path='/'>
          {splashNav}
        </Route>
        <Route path='/login'>{authNav}</Route>
        <Route path='/sign-up'>{authNav}</Route>
        <Route path='/explore'>{mainNav}</Route>
        <Route exact path='/photos/:userId(\d+)'>
          {mainNav}
        </Route>
        <Route path='/photos/:userId(\d+)/:imageId(\d+)'>{mainNav}</Route>
        <Route path='/photos/upload'>{photosUploadNav}</Route>
      </Switch>
    </>
  );
}
