import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
// import { login } from '../../store/session';
import * as sessionActions from '../../store/session';

export default function AddChannelForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  //slices of react state for controlled inputs
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  //login submit handlers
  const submitLogin = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    // send request to backend API login route (api/session)
    const data = await dispatch(sessionActions.login({ credential, password }));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className='login-card-container'>
      <div className='login-card'>
        <h2 className='login-header'>Log In</h2>

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
