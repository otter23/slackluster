import './Footer.css';

import React from 'react';

// import fbIcon from '../../images/icons/fb-icon.svg';
// import twitterIcon from '../../images/icons/twitter-icon.svg';
// import instaIcon from '../../images/icons/insta-icon.svg';

export default function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer-top-row'>
        <div className='footer-developer-container'>
          <div className='footer-developer-name'>Developed by Elan Katz</div>

          <div className='footer-image-links'>
            <a
              className='footer-github-link'
              href='https://github.com/otter23'
              target='_blank'
              rel='noreferrer'
            >
              {' '}
            </a>
            <a
              className='footer-linkedIn-link'
              href='https://www.linkedin.com/in/elankatz/'
              target='_blank'
              rel='noreferrer'
            >
              {' '}
            </a>
          </div>
        </div>
        <div className='footer-technologies'>
          <div>Javascript</div>
          <div>HTML5 / CSS3</div>
          <div>React / Redux</div>
          <div>Express</div>
          <div>Sequelize / PostgreSQL</div>
        </div>

        {/* <div>Status</div>
        <div>Privacy</div>
        <div>Terms</div> */}
      </div>

      {/* <div className='footer-bot-row'>
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
      </div> */}
    </footer>
  );
}
