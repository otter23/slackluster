import './Splash.css';

import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import Footer from '../Footer';
import NavBarSplash from '../NavBarSplash';
// import image from '../../images/splash-bg-alt.jpg';

export default function SplashPage({ isLoaded }) {
  // const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <NavBarSplash />
      <div
        className='splash-background'
        // style={{ backgroundImage: `url(${image})` }}
      >
        <div className='splash-body-container'>
          <h1 className='splash-find-inspiration'>
            Slackluster is your digital HQ
          </h1>
          <h2>
            Transform the way you work with one place for everyone and
            everything you need to get stuff done.
          </h2>
          <Link to='/get-started' className='splash-start-for-free'>
            Try for free
          </Link>
        </div>

        {/* <div className='splash-photo-meta-container'>
          <div className='splash-photo-title'>
            <a href='https://www.flickr.com/photos/137364640@N08/51103074015/'>
              Slackluster
            </a>
          </div>
          <div className='splash-photo-username'>
            <a href='https://www.flickr.com/photos/137364640@N08/51103074015/'>
              by Slackluster
            </a>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
}
