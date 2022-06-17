import './LoginForm.css';
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

//format for Create-react-app which uses SVGR under the hood:
//import { ReactComponent as FlickrLogo } from './Flickr.svg';

// import loginBg from '../../images/login-bg-2000x1333.jpg';
import slacklusterLogo from '../../images/Slack_RGB_logo.svg';
import NavBarSplash from '../NavBarSplash';

export default function LoginFormPage() {
  const dispatch = useDispatch();

  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);

  //slices of react state for controlled inputs
  const [credential, setCredential] = useState(
    window.localStorage.getItem('nFlckrEmail') || ''
  );
  const [credentialLabel, setCredentialLabel] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordLabel, setPasswordLabel] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState([]);

  //if redux state updated with user session, redirect to homepage
  //consider using history if want to be able to use back button
  if (sessionUser) return <Redirect to='/' />;

  //on submit dispatch login thunk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    // send request to backend API login route (api/session)
    try {
      const response = await dispatch(
        sessionActions.login({ credential, password })
      );

      if (response.ok) {
        //save email for next session if remember checked
        if (remember) window.localStorage.setItem('nFlckrEmail', credential);
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      if (data && data.errors) setErrors(data.errors);
    }

    // return dispatch(sessionActions.login({ credential, password })).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   }
    // );
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        sessionActions.login({
          credential: 'demo@user.io',
          password: 'password',
        })
      );

      if (response.ok) {
        return;
      }
    } catch (errorResponse) {
      //should not return errors unless demo user no longer in database
      const data = await errorResponse.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <>
      <NavBarSplash />
      <div
        className='login-background'
        // style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className='login-card-container'>
          <div className='login-card'>
            <div className='login-logo-icon-container'>
              <img
                src={slacklusterLogo}
                alt='logo'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid meet'
                className='login-logo-icon'
              />
            </div>
            <h6 className='login-header'>Log in to Slackluster</h6>

            {errors.length > 0 && (
              <div className='login-error-container'>
                <p className='login-error-message'>
                  Invalid email or password.
                </p>
                {/* {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))} */}
              </div>
            )}

            <form
              className={`login-form-control`}
              autoComplete='off'
              onSubmit={handleSubmit}
            >
              {/* <input
                autocomplete='false'

                type='text'
                styles='display:none;'
              ></input> */}
              <div
                className={`login-form-group ${
                  credentialLabel ? 'login-form-group-color' : ''
                }`}
              >
                <label
                  className={`login-label ${
                    credential.length > 0 || credentialLabel
                      ? 'login-label-small'
                      : ''
                  } ${credentialLabel ? 'login-label-color' : ''}`}
                  htmlFor='email'
                >
                  Email address
                  {/* Username or Email */}
                </label>
                <input
                  id='email'
                  className={`login-input`}
                  type='text'
                  name='email'
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  onFocus={() => setCredentialLabel((prev) => !prev)}
                  onBlur={() => setCredentialLabel((prev) => !prev)}
                  required
                />
              </div>

              <div
                className={`login-form-group ${
                  passwordLabel ? 'login-form-group-color' : ''
                }`}
              >
                <label
                  className={`login-label ${
                    password.length > 0 || passwordLabel
                      ? 'login-label-small'
                      : ''
                  } ${passwordLabel ? 'login-label-color' : ''}`}
                  htmlFor='password'
                >
                  Password
                </label>
                <div className='login-input-icon-container'>
                  <input
                    id='password'
                    className={`login-input`}
                    type={hidePassword ? 'password' : 'text'}
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordLabel((prev) => !prev)}
                    onBlur={() => setPasswordLabel((prev) => !prev)}
                    required
                  />
                  <div
                    className='login-eye-icon-container'
                    onClick={(e) => setHidePassword((prevVal) => !prevVal)}
                  >
                    {hidePassword ? (
                      <span className='material-symbols-outlined'>
                        visibility
                      </span>
                    ) : (
                      <span className='material-symbols-outlined'>
                        visibility_off
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className='login-checkbox-container'>
                <label className='login-checkbox-label' htmlFor='remember'>
                  <input
                    id='remember'
                    className=''
                    type='checkbox'
                    name='remember'
                    value='remember'
                    checked={remember}
                    onChange={(e) => setRemember((prevVal) => !prevVal)}
                  />
                  <span> Remember email address</span>
                </label>
              </div>

              <div className='login-sign-in-btn-container'>
                <button className='login-sign-in-btn' type='submit'>
                  Sign In
                </button>
                {/* <Link className='btn btn-cancel' to='/'>Cancel</Link> */}
              </div>

              <div className='demo-sign-in-btn-container'>
                <button
                  className='demo-sign-in-btn'
                  type='button'
                  onClick={demoLogin}
                >
                  Demo User Sign In
                </button>
              </div>
            </form>

            <div className='login-card-bottom'>
              <div className='login-forgot-password'>
                {/* to='/forgot-password' */}
                <Link className='login-link-forgot' to='#'>
                  Forgot password?
                </Link>
              </div>

              <div className='login-not-member'>
                <span>Not a Slackluster member?</span>
                <Link className='login-link-signup' to='/get-started'>
                  Sign up here.
                </Link>
              </div>
            </div>

            {/* <div className='login-footer'>
              <div className='login-footer-left'>
                English
                <span className='material-symbols-outlined login-footer-icon'>
                  expand_more
                </span>
              </div>

              <div className='login-footer-right'>
                <span>Help</span>
                <span>Privacy</span>
                <span>Terms</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
