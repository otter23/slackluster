import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import SplashPage from './components/SplashPage';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import MainPage from './components/MainPage';

import * as sessionActions from './store/session';
import * as usersActions from './store/users';
import * as channelsActions from './store/channels';
import * as messagesActions from './store/messages';

export default function App() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [isChannelsLoaded, setIsChannelsLoaded] = useState(false);

  //restore user Sesssion
  useEffect(() => {
    //on first mount, check whether jwt token credentials matches user in db.
    //if so add user to Redux State
    dispatch(sessionActions.restoreUser())
      .then(() => setIsAuthLoaded(true))
      .catch((res) => console.log(res));
    // (async () => {
    //   await dispatch(sessionActions.restoreUser())
    //   .catch((res) =>console.log(res));
    //   setIsAuthLoaded(true);
    // })();
  }, [dispatch]);

  //eager load db resources users, channels, messages into state
  //Note this approach is not scalable as your db grows.
  //Also load each channel's resources individually when a user joins a channel
  useEffect(() => {
    if (sessionUser) {
      dispatch(usersActions.getAllUsersThunk()).catch((res) =>
        console.log(res)
      );
      //or just eager load default channel into state?
      dispatch(channelsActions.getAllChannelsThunk())
        .then(() => setIsChannelsLoaded(true))
        .catch((res) => console.log(res));
      dispatch(messagesActions.getAllMessagesThunk()).catch((res) =>
        console.log(res)
      );
    }
  }, [dispatch, sessionUser]);

  //only load App after Session Cookie is checked and user is loaded into redux
  if (!isAuthLoaded) return null;

  if (isAuthLoaded) {
    // prettier-ignore
    return (
      <>
        <Switch>
          <Route exact path='/'>
            {sessionUser ? (
              <Redirect to='/client/workspace'></Redirect>
            ) : (
              <SplashPage />
            )}
          </Route>

          <Route path='/login'>
            <LoginFormPage />
          </Route>

          <Route path='/get-started'>
            <SignupFormPage />
          </Route>

          <Route path='/client/workspace'>
            {sessionUser ? (
              <MainPage isChannelsLoaded={isChannelsLoaded} />
            ) : (
              <Redirect to='/'></Redirect>
            )}
          </Route>

          <Route>
            <h1>Page Not Found </h1>
          </Route>
        </Switch>
      </>
    );
  }
}
