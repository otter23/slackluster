import React from 'react';

// import './reset.css';
import './index.css';

import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { restoreCSRF, csrfFetch } from './store/utils/csrf';

import * as sessionActions from './store/session';
import * as usersActions from './store/users';

//create the redux store
import { Provider } from 'react-redux';
import configureStore from './store';
const store = configureStore();

//DEVELOPMENT ONLY:
//used for debugging redux in development
//also adds csrf because separate backend/frontend servers in development
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF(); //add csrf's XSRF-TOKEN to cookies
  window.csrfFetch = csrfFetch; //add helper function to window to make csrf protected fetch calls to backend api
  window.store = store; //easy access to store and its methods in browser console
  window.sessionActions = sessionActions; //test session redux state
  window.usersActions = usersActions; //test users redux state
}

//TODO SET UP CONTEXT PROVIDER

//root wrapper used to wrap <App/>  in various provider components
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

//NOTE: strict mode renders components twice on development to detect errors in your code.
//thus if you have an alert, would show the alert twice
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

//For testing out non-strict mode
// ReactDOM.render(<Root />, document.getElementById('root'));
