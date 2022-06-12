import './AddChannelForm.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { login } from '../../store/session';

import hashIcon from '../../images/icons/hash-icon-offWhite.svg';

import * as channelsActions from '../../store/session';

export default function AddChannelForm({ closModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channels.channelByChannelId);
  const channelId = useSelector((state) => state.channels.currentChannelId);

  //slices of react state for controlled inputs
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [navRow, setNavRow] = useState('about');

  //login submit handlers
  const submitLogin = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    // send request to backend API login route (api/session)
    const data = await dispatch(
      channelsActions.login({ credential, password })
    );
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className='addChannel-card-container'>
      <div className='addChannel-card'>
        <div className='addChannel-header'>
          <div className='addChannel-header-left'>
            <img src={hashIcon} alt='hash' className='channel-hash-icon'></img>
            <div>{channels[channelId]?.name}</div>
          </div>
          <div className='addChannel-close'>
            <div className='material-symbols-outlined  '>close</div>
          </div>
        </div>

        <div className='addChannel-row-two'>
          <ul className='addChannel-row-two-inner'>
            <li className='addChannel-about'>
              <div
                className={`addChannel-inactive
                ${navRow === 'about' ? 'addChannel-active' : ''}`}
                onClick={() => setNavRow('about')}
              >
                <span>About</span>
              </div>
            </li>
            <li className='addChannel-members'>
              <div
                className={`addChannel-inactive
                ${navRow === 'members' ? 'addChannel-active' : ''}`}
                onClick={() => setNavRow('members')}
              >
                <span>Members</span>
              </div>
            </li>
          </ul>
        </div>

        <div className='addChannel'></div>

        {errors.length > 0 && (
          <div className='login-error-container'>
            {/* <p className='login-error-message'>Invalid email or password.</p> */}
            {errors.map((error, ind) => (
              <div key={ind}>{error.split(': ')[1]}</div>
            ))}
          </div>
        )}

        <form
          className={`login-form-control`}
          autoComplete='off'
          onSubmit={submitLogin}
        >
          <div className={`login-form-group`}>
            <label className={`login-label`} htmlFor='credential'>
              <div>Username / Email </div>
            </label>
            <input
              id='credential'
              className={`login-input`}
              type='text'
              name='credential'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>

          <div className={`login-form-group`}>
            <label className={`login-label`} htmlFor='password'>
              <div>Password </div>
            </label>
            <input
              id='password'
              className={`login-input`}
              type={'password'}
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='login-sign-in-btn-container'>
            <button className='login-sign-in-btn' type='submit'>
              Log In
            </button>
          </div>

          <div className='demo-sign-in-btn-container'>
            <button
              className='demo-sign-in-btn'
              type='button'
              // onClick={}
            >
              Demo Artist Log In
            </button>
          </div>
        </form>

        <div className='login-card-bottom'></div>
      </div>
    </div>
  );
}
