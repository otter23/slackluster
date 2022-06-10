import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import SplashPage from './components/SplashPage';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import MainPage from './components/MainPage';
import NavBarSplash from './components/NavBarSplash';

import * as sessionActions from './store/session';
import * as usersActions from './store/users';
import * as channelsActions from './store/channels';
import * as messagesActions from './store/messages';

export default function App() {
  const sessionUser = useSelector((state) => state.session.user);
  // const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  // const [sessionUserId, setSessionUserId] = useState(null);

  //on first render, check whether jwt token credentials matches user in db,
  //if so add user to Redux State
  useEffect(() => {
    // dispatch(sessionActions.restoreUser()).then(() => setIsAuthLoaded(true));
    if (!sessionUser) {
      (async () => {
        await dispatch(sessionActions.restoreUser()).catch((res) =>
          console.log(res)
        );
        setIsAuthLoaded(true);
      })();
    }
  }, [dispatch, sessionUser]);

  //eager load resources
  useEffect(() => {
    //eager load all users in db into state
    dispatch(usersActions.getAllUsersThunk()).then(() =>
      setIsUsersLoaded(true)
    );

    //eager load all channels in db into state
    dispatch(channelsActions.getAllChannelsThunk()).catch((res) =>
      console.log(res)
    );
    //eager load all channels in db into state
    dispatch(messagesActions.getAllMessagesThunk()).catch((res) =>
      console.log(res)
    );
  }, [dispatch]);

  //load userId to state once userSession is loaded
  // useEffect(() => {
  //   if (sessionUser) setSessionUserId(sessionUser.id);
  // }, [isAuthLoaded, sessionUser]);

  //eager load default channel into state on first render or once userId is updated.

  //ensure app rendering waits for sessionUser (if exists) to be loaded to state
  //TO DO: can remove isLoaded props most likely except for Navigation.
  // Or just make Navigation dependent on sessionUser only

  //only load App after Session Cookie is checked
  if (!isAuthLoaded) return null;

  if (isAuthLoaded && isUsersLoaded) {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            {/* LAnding Page once logged in */}
            {sessionUser ? (
              // <LandingPage isLoaded={isLoaded} />
              <Redirect to='/client/workspace'></Redirect>
            ) : (
              <SplashPage isLoaded={isAuthLoaded} />
            )}
          </Route>

          <Route path='/login'>
            <LoginFormPage isLoaded={isAuthLoaded} />
          </Route>

          <Route path='/get-started'>
            <SignupFormPage isLoaded={isAuthLoaded} />
          </Route>

          <Route path='/client/workspace'>
            <>
              <NavBarSplash />
              <MainPage isLoaded={isAuthLoaded} />
            </>
          </Route>

          <Route>
            <h1>Page Not Found </h1>
          </Route>
        </Switch>
      </>
    );
  }
}
