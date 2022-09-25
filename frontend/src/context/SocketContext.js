import React, { createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as usersActions from '../store/users';
import * as channelsActions from '../store/channels';
import * as messagesActions from '../store/messages';

//import client-side socket package
//https://socket.io/docs/v4/client-initialization/
import { io } from 'socket.io-client';

//create context
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  //useRef will allow socket to persist for the full lifetime of the component.
  const socket = useRef();

  const sessionUser = useSelector((state) => state.session.user);

  // Once user logged in, open socket connection, by default connects immediately upon creation
  useEffect(() => {
    // create websocket
    if (sessionUser) {
      //defaults to trying to connect to the host that serves the page.
      //the server URL will be deduced from the window.location object
      //works because frontend is served on the same domain as the server on heroku or via a proxy(?)
      socket.current = io();
      //socket.id - each new socket is assigned a random 20 character unique and synced with server
      //socket.connected - boolean describing whether socket is currently connected to server
      // console.log('Socket Connected');

      // socket.current.emit('join', sessionUser);
      // socket.current.on('welcome', (msg) => console.log(msg));

      //user event listeners to update redux state
      socket.current.on('user:add', ({ user }) => {
        dispatch(usersActions.addUser(user));
      });

      //channel event listeners to update redux state
      socket.current.on('channel:add', ({ newChannel }) => {
        dispatch(channelsActions.addChannel(newChannel));
      });
      socket.current.on('channel:update', ({ updatedChannel }) => {
        dispatch(channelsActions.updateChannel(updatedChannel));
      });
      socket.current.on('channel:delete', ({ ownerId, channelId }) => {
        dispatch(channelsActions.deleteChannel(ownerId, channelId));
        dispatch(messagesActions.deleteChannelMessages(ownerId, channelId));
      });

      //message event listeners to update redux state
      socket.current.on('message:add', ({ newMessage }) => {
        dispatch(messagesActions.addMessage(newMessage));
      });
      socket.current.on('message:update', ({ updatedMessage }) => {
        dispatch(messagesActions.updateMessage(updatedMessage));
      });
      //prettier-ignore
      socket.current.on('message:delete', ({ ownerId, messageId, channelId }) => {
        dispatch(messagesActions.deleteMessage(ownerId, messageId, channelId));
      });
    }

    // when component unmounts, disconnect from socket
    return () => {
      if (sessionUser) {
        // if (socket.current.connected) {
        //Manually disconnects the socket. In this case, the socket will not try to reconnect.
        socket.current.disconnect();
        // console.log('Socket disconnected');
        // }
      }
    };
  }, [dispatch, sessionUser]);

  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};

/*
SOCKET DATA FLOW:
  User hits submit:
    Thunk dispatched to update database (persist data)
      If error, display error,
      If response is ok:
        Server broadcasts a message/channel was added/updated/deleted event (and includes the data needed)
        All Users receive broadcast and update redux state based on that data using regular redux actions
        channel's messages auto re-renders because channel component is subscribed to state

  Note: only ever looking at one channel at a time, when you click a channel, it will do a getChannelMEssagesThunk

  Edge cases,
  -If some how disconnected to internet or server, how do you know if received all broacast messages?
    -could send a state variable to validate against, and if state not up to date, then send fetch to db
    -or could fetch based on a setInterval
  -Make db persistence seem instant:
    -For client who sent message, it appears as if sent it, only if goes wrong do you throw error and remove message
    -originator doesn't know other's haven't seen their message yet, if db persistence errors, then show errors

To read later (socket.io react component):
  https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
  https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial
  https://www.fullstacklabs.co/blog/chat-application-react-express-socket-io
  https://www.valentinog.com/blog/socket-react/
  */
