//Redux state slice to hold messages from db

import { csrfFetch } from './utils/csrf'; //restoreCSRF

//ACTION TYPES:
const GET_ALL_MESSAGES = 'messages/GetAllMessages';

const GET_USER_MESSAGES = 'messages/getUserMessages';
const GET_CHANNEL_MESSAGES = 'messages/getChannelMessages';
const ADD_MESSAGE = 'messages/addMessage';
const UPDATE_MESSAGE = 'messages/updateMessage';
const DELETE_MESSAGE = 'messages/deleteMessage';
const DELETE_CHANNEL_MESSAGES = 'messages/deleteChannelMessages';

//REGULAR ACTION CREATORS (implicit returns)

//payload: array of message objects
export const getAllMessages = ({
  allMessages,
  messageByMessageId,
  messagesByChannelId,
}) => ({
  type: GET_ALL_MESSAGES,
  payload: { allMessages, messageByMessageId, messagesByChannelId },
});

//payload: array of user message objects
export const getUserMessages = (userMessages, ownerId) => ({
  type: GET_USER_MESSAGES,
  payload: { userMessages, ownerId },
});

//payload: array of user message objects
export const getChannelMessages = (channelMessages, channelId) => ({
  type: GET_CHANNEL_MESSAGES,
  payload: { channelMessages, channelId },
});

//Payload: one message object
export const addMessage = (newMessage) => ({
  type: ADD_MESSAGE,
  payload: { newMessage },
});

//Payload: one updated user message object
export const updateMessage = (updatedMessage) => ({
  type: UPDATE_MESSAGE,
  payload: { updatedMessage },
});

//Payload: ownerId and messageId to key into messageByMessageId  user object
export const deleteMessage = (ownerId, messageId, channelId) => ({
  type: DELETE_MESSAGE,
  payload: { ownerId, messageId, channelId },
});

//Payload: ownerId and messageId to key into messageByMessageId  user object
export const deleteChannelMessages = (channelId) => ({
  type: DELETE_CHANNEL_MESSAGES,
  payload: { channelId },
});

//THUNK ACTION CREATORS:

//request to backend for all messages
//messages are pre-sorted by alphabetical order in backend
export const getAllMessagesThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/messages`);

  if (response.ok) {
    const resBody = await response.json();
    dispatch(getAllMessages(resBody));
    return response;
  } else throw response;
};

//request to backend for all messages owned by a user
//messages are pre-sorted by alphabetical order in backend
export const getUserMessagesThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/messages`);

  if (response.ok) {
    const resBody = await response.json();

    //Normalize array into an object with  (Index messages by id):
    //idToMessage or UserMessageById
    let userMessages = {};
    resBody.forEach((message) => {
      userMessages[message.id] = message;
    });

    dispatch(getUserMessages(userMessages, userId));
    return response;
  } else throw response;
};

//request to backend for all messages belonging to a channel
//messages are pre-sorted by alphabetical order in backend
export const getChannelMessagesThunk = (channelId) => async (dispatch) => {
  const response = await csrfFetch(`/api/messages/channels/${channelId}`);

  if (response.ok) {
    const channelMessages = await response.json();
    dispatch(getChannelMessages(channelMessages, channelId));
    return response;
  } else throw response;
};

//request to backend to add a message
export const addMessageThunk = (formData) => async (dispatch) => {
  const { ownerId, channelId, groupId, threadId, content } = formData;

  const response = await csrfFetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify({
      ownerId,
      channelId,
      groupId,
      threadId,
      content,
    }),
  });

  if (response.ok) {
    const newMessage = await response.json();
    // dispatch(addMessage(newMessage));
    response.newMessage = newMessage;
    return response;
  } else throw response;
};

//request to backend to update a message
export const updateMessageThunk = (formData) => async (dispatch) => {
  const { messageId, channelId, groupId, threadId, content } = formData;

  const response = await csrfFetch(`/api/messages/${messageId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      channelId,
      groupId,
      threadId,
      content,
    }),
  });

  if (response.ok) {
    const updatedMessage = await response.json();
    // dispatch(updateMessage(updatedMessage));
    response.updatedMessage = updatedMessage;
    return response;
  } else throw response;
};

//request to backend to delete a message
export const deleteMessageThunk =
  (ownerId, messageId, channelId) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const resBody = await response.json();
      if (resBody.message === 'Success') {
        // dispatch(deleteMessage(ownerId, messageId, channelId));
      }
      return response;
    } else throw response;
  };

//MESSAGE REDUCER:
const initialState = {
  allMessages: [],
  messageByMessageId: {},
  messagesByChannelId: {},
  // messageByOwnerId: {},
};
// messageByMessageId = { messageId1:  {messageObj1}, messageId2: {messageObj1}}
// messagesByChannelId =  {channelId: [msgObj1, msgObj2, msgObj3]},
//in scalable version each userId object would also have a property:    allUserMessages:[]
//When map over user obj, need to first make it an array with Object.array in component

// allMessages: [] - this will be for the landing page, main app
//to update this part of state need to user .find or .findIndex

export default function messagesReducer(state = initialState, action) {
  Object.freeze(state);
  Object.freeze(state.allMessages);
  Object.freeze(state.messageByMessageId);
  Object.freeze(state.messagesByChannelId);
  // Object.freeze(state.messageByOwnerId);

  //Deep Clone State:
  let allMessages = [];
  state.allMessages.forEach((message) => {
    allMessages.push({ ...message });
  });

  let messageByMessageId = {};
  Object.keys(state.messageByMessageId).forEach((key) => {
    let message = state.messageByMessageId[key];
    messageByMessageId[message.id] = { ...message };
  });

  let messagesByChannelId = {};
  Object.keys(state.messagesByChannelId).forEach((key) => {
    let messageArr = [];
    state.messagesByChannelId[key].forEach((message) => {
      messageArr.push({ ...message });
    });
    messagesByChannelId[key] = messageArr;
  });

  // let messageByOwnerId = {};
  // Object.keys(state.messageByOwnerId).forEach((key) => {
  //   let message = state.messageByOwnerId[key];
  //   messagesByOwnerId[message.id] = { ...message };
  // });

  const newState = {
    ...state,
    allMessages,
    messageByMessageId,
    messagesByChannelId,
    // messagesByOwnerId,
  };

  // optional chaining that works in transpiler, ?. doesn't work
  // const testVar = action || {}.payload || {}.allMessages;

  // let ownerId;
  let messageId;
  let channelId;
  let index;

  switch (action.type) {
    case GET_ALL_MESSAGES:
      newState.allMessages = action.payload.allMessages;
      newState.messageByMessageId = action.payload.messageByMessageId;
      newState.messagesByChannelId = action.payload.messagesByChannelId;

      return newState;

    // case GET_USER_MESSAGES:
    //   ownerId = action.payload.ownerId;
    //   newState.messagesByOwnerId[ownerId] = action.payload.userMessages;
    //   return newState;

    case GET_CHANNEL_MESSAGES:
      channelId = action.payload.channelId;
      newState.messagesByChannelId[channelId] = action.payload.channelMessages;

      return newState;

    case ADD_MESSAGE:
      // ownerId = action.payload.newMessage.ownerId;
      messageId = action.payload.newMessage.id;
      channelId = action.payload.newMessage.channelId;

      //add message to end of array sorted by "name"
      newState.allMessages?.push(action.payload.newMessage);

      //re-sort message array based on name in ASC order
      newState.allMessages.sort((a, b) => {
        return b.name - a.name;
      });

      //add message to messageByMessageId
      newState.messageByMessageId[messageId] = action.payload.newMessage;

      //add message to messagesByChannelId
      newState.messagesByChannelId[channelId]?.push(action.payload.newMessage);

      return newState;

    case UPDATE_MESSAGE:
      // ownerId = action.payload.updatedMessage.ownerId;
      messageId = action.payload.updatedMessage.id;
      channelId = action.payload.updatedMessage.channelId;

      //find index of message to update
      index = newState.allMessages?.findIndex(
        (message) => message.id === parseInt(messageId)
      );
      //replace message in allMessages array
      newState.allMessages[index] = action.payload.updatedMessage;

      //replace message in messageByMessageId
      newState.messageByMessageId[messageId] = action.payload.updatedMessage;

      //find index of message to update
      index = newState.messagesByChannelId[channelId]?.findIndex(
        (message) => message.id === parseInt(messageId)
      );
      //replaced message in messagesByChannelId
      newState.messagesByChannelId[channelId][index] =
        action.payload.updatedMessage;

      return newState;

    case DELETE_MESSAGE:
      // ownerId = action.payload.ownerId;
      messageId = action.payload.messageId;
      channelId = action.payload.channelId;

      //find index of message to delete
      index = newState.allMessages?.findIndex(
        (message) => message.id === parseInt(messageId)
      );
      //remove message from allMessages array
      newState.allMessages?.splice(index, 1);

      //remove message in messageByMessageId
      delete newState.messageByMessageId[messageId];

      //find index of message to delete
      index = newState.messagesByChannelId[channelId]?.findIndex(
        (message) => message.id === parseInt(messageId)
      );
      //remove message from messagesByChannelId array
      newState.messagesByChannelId[channelId]?.splice(index, 1);

      return newState;

    case DELETE_CHANNEL_MESSAGES:
      channelId = action.payload.channelId;

      //remove channel from messagesByChannelId
      delete newState.messagesByChannelId[channelId];
      return newState;

    default:
      return state;
  }
}

//TEST THUNKS:

//RUN THESE TWO FIRST BEFORE TESTING UPDATE AND DELETE

//GET ALL MESSAGES
// window.store.dispatch(window.messagesActions.getAllMessagesThunk())

//GET ALL MESSAGES OWNED BY A USER - NOT IMPLEMENTED
// window.store.dispatch(window.messagesActions.getUserMessagesThunk(1))

//GET ALL MESSAGES IN A CHANNEL
// window.store.dispatch(window.messagesActions.getChannelMessagesThunk(2))

//Test unauthorized ids as well, e.g. messages not owned by the logged in user

//ADD MESSAGE
// window.store.dispatch(
//   window.messagesActions.addMessageThunk({
//     ownerId: 1,
//     channelId: 1,
//     groupId: null,
//     threadId: null,
//     content: "first message",
//   })
// ).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

//UPDATE MESSAGE
// window.store.dispatch(
//   window.messagesActions.updateMessageThunk({
//     messageId: 1,
//     channelId: 1,
//     groupId: null,
//     threadId: null,
//     content: "UPDATED message",
//   })
// ).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

// DELETE MESSAGE
// window.store.dispatch(window.messagesActions.deleteMessageThunk(1, 1)).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})
// window.store.dispatch(window.messagesActions.deleteMessageThunk(1, 5,1)).catch(async (res) => { console.log(res)})
