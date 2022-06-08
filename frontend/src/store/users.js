//Redux state slice to hold users from db
import { csrfFetch } from './utils/csrf'; //restoreCSRF

//ACTION TYPES:
const GET_ALL_USERS = 'users/GET_ALL_USERS';

//REGULAR ACTION CREATORS (implicit returns)
export const getAllUsers = (usersByUserId) => ({
  type: GET_ALL_USERS,
  payload: { usersByUserId },
});

//THUNK ACTION CREATORS:
//request to backend for all users safe information in db
export const getAllUsersThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/ids`);

  if (response.ok) {
    const usersByUserId = await response.json();
    dispatch(getAllUsers(usersByUserId));
    return response;
  } else throw response;
};

//User REDUCER:

const initialState = { usersByUserId: {} };
// initialState = { usersByUserId: {userId1: userObj1 userId2: userObj2 } };
//Note: when map over user state obj in JSX,  make it an array with Object.array

export default function photosReducer(state = initialState, action) {
  Object.freeze(state);

  //Shallow Clone State:
  let newState = { ...state };

  //Deep Clone State:
  Object.keys(state.usersByUserId).forEach((key) => {
    let user = state.usersByUserId[key];
    newState.usersByUserId[key] = { ...user };
  });

  switch (action.type) {
    case GET_ALL_USERS:
      //replaces all keys with same id wih new id objects
      newState.usersByUserId = { ...action.payload.usersByUserId };
      // // just overwriting state entirely with data from database.
      // newState.usersByUserId = action.payload.usersByUserId;
      return newState;
    default:
      return state;
  }
}

//TEST THUNK:

// window.store.dispatch(window.usersActions.getAllUsersThunk());
