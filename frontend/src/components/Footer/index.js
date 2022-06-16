import './Footer.css';

import React from 'react';
// import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import fbIcon from '../../images/icons/fb-icon.svg';
import twitterIcon from '../../images/icons/twitter-icon.svg';
import instaIcon from '../../images/icons/insta-icon.svg';

import githubLogo from '../../images/github.svg';
import linkedInLogo from '../../images/linkedin.svg';

export default function Footer() {
  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
  }

  const mainFooter = (
    <footer className='footer-container'>
      <div className='footer-developer-name'>
        <div>Elan Katz</div>
        <div className='footer-image-links'>
          <a href='https://github.com/otter23' target='_blank' rel='noreferrer'>
            <img src={githubLogo} height='20px' alt='github'></img>
          </a>
          <a
            href='https://www.linkedin.com/in/elankatz/'
            target='_blank'
            rel='noreferrer'
          >
            <img src={linkedInLogo} height='25px' alt='linkedIn'></img>
          </a>
        </div>
      </div>
      <div className='footer-top-row'>
        <div>Status</div>
        <div>Privacy</div>
        <div>Terms</div>
      </div>
      <div className='footer-bot-row'>
        <div className='footer-icon-container'>
          <img className='footer-fb-icon' src={fbIcon} alt='facebook icon' />
          <img
            className='footer-twt-icon'
            src={twitterIcon}
            alt='twitter icon'
            style={{ width: '24px', height: '24px' }}
          />
          <img
            className='footer-insta-icon'
            src={instaIcon}
            alt='instagram icon'
          />
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <Switch>
        <Route exact path='/'>
          {mainFooter}
        </Route>
        <Route path='/login'></Route>
        <Route path='/sign-up'></Route>
        <Route path='/explore'>{mainFooter}</Route>
        <Route path='/photos/:userId'>{mainFooter}</Route>
        <Route path='/photos/:userId/:imageId'>{mainFooter}</Route>
        <Route path='/photos/upload'>{mainFooter}</Route>
      </Switch>
    </>
  );
}
