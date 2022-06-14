//Redux state slice to hold channels from db

import { csrfFetch } from './utils/csrf'; //restoreCSRF
// import { deleteChannelMessages } from './messages'; //restoreCSRF

//ACTION TYPES:
const GET_ALL_CHANNELS = 'channels/getAllChannels';
const GET_USER_CHANNELS = 'channels/getUserChannels';
const ADD_CHANNEL = 'channels/addChannel';
const UPDATE_CHANNEL = 'channels/updateChannel';
const DELETE_CHANNEL = 'channels/deleteChannel';
const SET_CURRENT_CHANNEL = 'channels/setCurrentChannel';

//REGULAR ACTION CREATORS (implicit returns)

//payload: array of channel objects
export const getAllChannels = ({ allChannels, channelByChannelId }) => ({
  type: GET_ALL_CHANNELS,
  payload: { allChannels, channelByChannelId },
});

//payload: array of user channel objects
export const getUserChannels = (userChannels, ownerId) => ({
  type: GET_USER_CHANNELS,
  payload: { userChannels, ownerId },
});

//Payload: one channel object
export const addChannel = (newChannel) => ({
  type: ADD_CHANNEL,
  payload: { newChannel },
});

//Payload: one updated user channel object
export const updateChannel = (updatedChannel) => ({
  type: UPDATE_CHANNEL,
  payload: { updatedChannel },
});

//Payload: ownerId and channelId to key into channelByChannelId  user object
export const deleteChannel = (ownerId, channelId) => ({
  type: DELETE_CHANNEL,
  payload: { ownerId, channelId },
});

//Payload: ownerId and channelId to key into channelByChannelId  user object
export const setCurrentChannel = (channelId) => ({
  type: SET_CURRENT_CHANNEL,
  payload: { channelId },
});

//THUNK ACTION CREATORS:

//request to backend for all channels
//channels are pre-sorted by alphabetical order in backend
export const getAllChannelsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/channels`);

  if (response.ok) {
    const resBody = await response.json();
    dispatch(getAllChannels(resBody));
    return response;
  } else throw response;
};

//request to backend for all channels owned by a user
//channels are pre-sorted by alphabetical order in backend
export const getUserChannelsThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/channels`);

  if (response.ok) {
    const resBody = await response.json();

    //Normalize array into an object with  (Index channels by id):
    //idToChannel or UserChannelById
    let userChannels = {};
    resBody.forEach((channel) => {
      userChannels[channel.id] = channel;
    });

    dispatch(getUserChannels(userChannels, userId));
    return response;
  } else throw response;
};

//request to backend to add a channel
export const addChannelThunk = (formData) => async (dispatch) => {
  const { ownerId, name, topic, description } = formData;

  const response = await csrfFetch('/api/channels', {
    method: 'POST',
    body: JSON.stringify({
      ownerId,
      name,
      topic,
      description,
    }),
  });

  if (response.ok) {
    const newChannel = await response.json();
    // dispatch(addChannel(newChannel));
    dispatch(setCurrentChannel(newChannel.id));
    response.newChannel = newChannel;
    return response;
  } else throw response;
};

//request to backend to update a channel
export const updateChannelThunk = (formData) => async (dispatch) => {
  const { channelId, name, topic, description } = formData;

  const response = await csrfFetch(`/api/channels/${channelId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      channelId,
      name,
      topic,
      description,
    }),
  });

  if (response.ok) {
    const updatedChannel = await response.json();
    // dispatch(updateChannel(updatedChannel));
    response.updatedChannel = updatedChannel;
    return response;
  } else throw response;
};

//request to backend to delete a channel
export const deleteChannelThunk = (ownerId, channelId) => async (dispatch) => {
  const response = await csrfFetch(`/api/channels/${channelId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const resBody = await response.json();
    if (resBody.message === 'Success') {
      dispatch(setCurrentChannel(1));
      // dispatch(deleteChannel(ownerId, channelId));
      //remove channel from messageByChannelId
      // dispatch(deleteChannelMessages(channelId));
    }
    return response;
  } else throw response;
};

//CHANNEL REDUCER:
const initialState = {
  currentChannelId: 1, //default channel to display
  allChannels: [],
  channelByChannelId: {},
  // channelsByOwnerId: {},
};
// channelByChannelId = { channelId1:  {channelObj1}, channelId2: {channelObj1}}
//in scalable version each userId object would also have a property:    allUserChannels:[]
//When map over user obj, need to first make it an array with Object.array in component

// allChannels: [] - this will be for the landing page, main app
//to update this part of state need to user .find or .findIndex

export default function channelsReducer(state = initialState, action) {
  Object.freeze(state);
  Object.freeze(state.currentChannelId);
  Object.freeze(state.allChannels);
  Object.freeze(state.channelByChannelId);
  // Object.freeze(state.channelsByOwnerId);

  //Deep Clone State:
  let allChannels = [];
  state.allChannels.forEach((channel) => {
    allChannels?.push({ ...channel });
  });

  // let channelsByOwnerId = {};
  // Object.keys(state.channelsByOwnerId).forEach((key) => {
  //   let channel = state.channelsByOwnerId[key];
  //   channelsByOwnerId[channel.id] = { ...channel };
  // });

  let channelByChannelId = {};
  Object.keys(state.channelByChannelId).forEach((key) => {
    let channel = state.channelByChannelId[key];
    channelByChannelId[channel.id] = { ...channel };
  });

  const newState = {
    ...state,
    allChannels,
    channelByChannelId,
    // channelsByOwnerId,
  };

  // optional chaining that works in transpiler, ?. doesn't work
  // const testVar = action || {}.payload || {}.allChannells;

  // let ownerId;
  let channelId;
  let index;

  switch (action.type) {
    case GET_ALL_CHANNELS:
      newState.allChannels = action.payload.allChannels;
      newState.channelByChannelId = action.payload.channelByChannelId;

      return newState;

    // case GET_USER_CHANNELS:
    //   ownerId = action.payload.ownerId;
    //   newState.channelsByOwnerId[ownerId] = action.payload.userChannels;
    //   return newState;

    case ADD_CHANNEL:
      // ownerId = action.payload.newChannel.ownerId;
      channelId = action.payload.newChannel.id;
      //add channel to end of array sorted by "name"
      newState.allChannels?.push(action.payload.newChannel);

      //re-sort channel array based on name in ASC order
      newState.allChannels?.sort((a, b) => {
        const nameA = a.name.toLowerCase(); // ignore upper and lowercase
        const nameB = b.name.toLowerCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0; // names must be equal
      });

      //add channel to channelByChannelId
      newState.channelByChannelId[channelId] = action.payload.newChannel;

      return newState;

    case UPDATE_CHANNEL:
      // ownerId = action.payload.updatedChannel.ownerId;
      channelId = action.payload.updatedChannel.id;

      //find index of channel to update
      index = newState.allChannels?.findIndex(
        (channel) => channel.id === parseInt(channelId)
      );

      //replace channel in allChannels array
      newState.allChannels[index] = action.payload.updatedChannel;

      //re-sort channel array based on name in ASC order
      newState.allChannels?.sort((a, b) => {
        const nameA = a.name.toLowerCase(); // ignore upper and lowercase
        const nameB = b.name.toLowerCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0; // names must be equal
      });

      //replace channel in channelByChannelId
      newState.channelByChannelId[channelId] = action.payload.updatedChannel;

      return newState;

    case DELETE_CHANNEL:
      // ownerId = action.payload.ownerId;
      channelId = action.payload.channelId;

      //find index of channel to delete
      index = newState.allChannels?.findIndex(
        (channel) => channel.id === parseInt(channelId)
      );
      //remove channel from allChannels array
      newState.allChannels?.splice(index, 1);

      //remove channel in channelByChannelId
      delete newState.channelByChannelId[channelId];

      return newState;

    case SET_CURRENT_CHANNEL:
      channelId = action.payload.channelId;
      newState.currentChannelId = channelId;

      return newState;

    default:
      return state;
  }
}

//TEST THUNKS:

//RUN THESE TWO FIRST BEFORE TESTING UPDATE AND DELETE

//GET ALL CHANNELS
// window.store.dispatch(window.channelsActions.getAllChannelsThunk())

//GET ALL CHANNELS OWNED BY A USER - NOT IMPLEMENTED
// window.store.dispatch(window.channelsActions.getUserChannelsThunk(1))

//Test unauthorized ids as well, e.g. channels not owned by the logged in user

//ADD CHANNEL
// window.store.dispatch(
//   window.channelsActions.addChannelThunk({
//     ownerId: 1,
//     name: 'NEWEST-Channel',
//     topic: 'NEWEST Channel',
//     description: null,
//   })
// ).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

//UPDATE CHANNEL
// window.store.dispatch(
//   window.channelsActions.updateChannelThunk({
//     channelId: 8,
//     name: 'UPDATE-Channel',
//     topic: 'UPDATE Channel',
//     description: null,
//   })
// ).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

//DELETE CHANNEL
// window.store.dispatch(window.channelsActions.deleteChannelThunk(1, 8)).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

//DELETE CHANNEL MESSAGES
