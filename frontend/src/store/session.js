//Redux state slice to hold the current session user's information

import { csrfFetch } from './utils/csrf'; //restoreCSRF

//Session Action Types:
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//Regular Action Creators (implicit returns)
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

//THUNK ACTION CREATORS:

//request to backend to restore User Session based on JWT cookie (if exists)
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session'); //GET
  const resBody = await response.json();
  dispatch(setUser(resBody.user));
  return response;
};

//request to backend to login a user and create JWT cookie if successful
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch(`/api/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password }),
  });

  // if (response.ok) {
  const resBody = await response.json();
  dispatch(setUser(resBody.user));
  return response;
  // }
};

//request to backend to signup/add user to db
export const signup = (user) => async (dispatch) => {
  const { username, email, password, confirmPassword } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//request to backend to logout user (remove JWT token)
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session/logout', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

//SESSION REDUCER:
const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  Object.freeze(state);
  let newState = { ...state };

  switch (action.type) {
    case SET_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return state;
  }
}

//Development:

//Test login thunk action
// window.store.dispatch(
//   window.sessionActions.login({
//     credential: 'Demo-lition',
//     password: 'password',
//   })
// );

//Test Restore User Thunk
//window.store.dispatch(window.sessionActions.restoreUser());

//Test signup
// window.store.dispatch(
//   window.sessionActions.signup({
//     username: 'NewUser',
//     email: 'new@user.io',
//     password: 'password',
//   })
// );

//test logout
// window.store.dispatch(window.sessionActions.logout());
