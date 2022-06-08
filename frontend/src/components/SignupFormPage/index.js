import './SignupForm.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';

// import signupBg from '../../images/login-bg-2000x1333.jpg';
import slacklusterLogo from '../../images/Slack_RGB_logo.svg';
import NavBarSplash from '../NavBarSplash';

function SignupFormPage() {
  const dispatch = useDispatch();

  //subscribe to session redux State
  const sessionUser = useSelector((state) => state.session.user);

  //slices of react state for controlled inputs and error handling
  const [email, setEmail] = useState('');
  const [emailLabel, setEmailLabel] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameLabel, setUsernameLabel] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordLabel, setPasswordLabel] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  // const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  //If already logged-in, user exists in session redux state, redirect to home page
  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (password === confirmPassword) {
    setErrors([]); //reset errors

    return dispatch(sessionActions.signup({ email, username, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        // console.log(errors);
      }
    );
    // }

    //if passwords don't match:
    // return setErrors([
    //   'Confirm Password field must be the same as the Password field',
    // ]);
  };

  return (
    <>
      <NavBarSplash />

      <div
        className='signup-background'
        // style={{ backgroundImage: `url(${signupBg})` }}
      >
        <div className='signup-card-container'>
          <div className='signup-card'>
            <div className='signup-logo-icon-container'>
              <img
                src={slacklusterLogo}
                alt='logo'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid meet'
                className='signup-logo-icon'
              />
            </div>

            <h6 className='signup-header'>Sign up for Slackluster</h6>

            {errors.length > 0 && (
              <div className='signup-error-container'>
                {/* <p className='signup-error-message'>Invalid email or password.</p> */}
                {errors.map((error, idx) => (
                  <p className='signup-error-message' key={idx}>
                    {error}
                  </p>
                ))}
              </div>
            )}

            <form
              className={`signup-form-control`}
              autoComplete='off'
              onSubmit={handleSubmit}
            >
              <div
                className={`signup-form-group ${
                  usernameLabel ? 'signup-form-group-color' : ''
                }`}
              >
                <label
                  className={`signup-label ${
                    username.length > 0 || usernameLabel
                      ? 'signup-label-small'
                      : ''
                  } ${usernameLabel ? 'signup-label-color' : ''}`}
                  htmlFor='username'
                >
                  Username
                </label>
                <input
                  id='username'
                  className={`signup-input`}
                  type='text'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameLabel((prev) => !prev)}
                  onBlur={() => setUsernameLabel((prev) => !prev)}
                  required
                />
              </div>

              <div
                className={`signup-form-group ${
                  emailLabel ? 'signup-form-group-color' : ''
                }`}
              >
                <label
                  className={`signup-label ${
                    email.length > 0 || emailLabel ? 'signup-label-small' : ''
                  } ${emailLabel ? 'signup-label-color' : ''}`}
                  htmlFor='email'
                >
                  Email address
                  {/* Username or Email */}
                </label>
                <input
                  id='email'
                  className={`signup-input`}
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailLabel((prev) => !prev)}
                  onBlur={() => setEmailLabel((prev) => !prev)}
                  required
                />
              </div>

              <div
                className={`signup-form-group ${
                  passwordLabel ? 'signup-form-group-color' : ''
                }`}
              >
                <label
                  className={`signup-label ${
                    password.length > 0 || passwordLabel
                      ? 'signup-label-small'
                      : ''
                  } ${passwordLabel ? 'signup-label-color' : ''}`}
                  htmlFor='password'
                >
                  Password
                </label>
                <div className='signup-input-icon-container'>
                  <input
                    id='password'
                    className={`signup-input`}
                    type={hidePassword ? 'password' : 'text'}
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordLabel((prev) => !prev)}
                    onBlur={() => setPasswordLabel((prev) => !prev)}
                    required
                  />
                  <div
                    className='signup-eye-icon-container'
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

              {/* <label>
              Confirm Password
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label> */}
              <div className='signup-signup-btn-container'>
                <button className='signup-signup-btn' type='submit'>
                  Sign Up
                </button>
                {/* <Link className='btn btn-cancel' to='/'>Cancel</Link> */}
              </div>
            </form>

            <div className='signup-card-bottom'>
              <div className='signup-terms-privacy'>
                <p>
                  By signing up, you agree with Slackluster's &nbsp;
                  <Link className='signup-link-terms' to='#'>
                    Terms of Services &nbsp;
                  </Link>
                  and &nbsp;
                  <Link className='signup-link-privacy' to='#'>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className='signup-not-member'>
                <span>Already a Slackluster member?</span>
                <Link className='signup-link-signup' to='/login'>
                  Log in here.
                </Link>
              </div>
            </div>

            <div className='signup-footer'>
              <div className='signup-footer-left'>
                English
                <span className='material-symbols-outlined signup-footer-icon'>
                  expand_more
                </span>
              </div>

              <div className='signup-footer-right'>
                <span>Help</span>
                <span>Privacy</span>
                <span>Terms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
