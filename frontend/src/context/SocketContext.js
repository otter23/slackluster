import React, { createContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

//import client-side socket package
import { io } from 'socket.io-client';

export const SocketContext = createContext();

//defaults to trying to connect to the host that serves the page.
export const SocketProvider = ({ children }) => {
  //useRef will allow socket to persist for the full lifetime of the component.
  const socket = useRef();
  const sessionUser = useSelector((state) => state.session.user);

  // Once user logged in, open socket connection, by default connects immediately upon creation
  useEffect(() => {
    // create websocket
    if (sessionUser) {
      socket.current = io();
      console.log('CONNECTED', socket);

      socket.current.on('welcome', (msg) => console.log(msg));

      socket.current.on('chat', (data) => {
        //TODO: when receive a chat even, UPDATE REDUX with regular actions, not a thunk
        console.log('chat message', data);
      });
    }
    // when component unmounts, disconnect from socket
    return () => {
      if (sessionUser) {
        socket.current.disconnect();
        console.log('DISCONNECTED', socket);
      }
    };
  }, [sessionUser]);

  /*
    SOCKET DATA FLOW:
      User hits submit:
        Thunk dispatched to update data in database to persist data
          If error, display error,
          If response is success:
            Server broadcasts a message was created/updated/deleted event (includes the data needed)
            Other Users receive broadcast and update redux state based on that data using regular actions
              -alt: other user just send a getChannelMessagesThunk to refresh data real fast
            Webpage auto re-renders because channel component is subscribed to state

     Note: only ever looking at one channel at a time, when you click a channel, it will do a getChannelMEssagesThunk

     Edge cases,
      -If some how disconnected to internet or server, how do you know if received all broacast messages?
        -could send a state variable to validate against, and if state not up to date, then send fetch to db
        -or could fetch based on a setInterval
      -Make db persistence seem instant.
        -For client who sent message, it appears as if sent it, only if goes wrong do you throw error and remove message
        -originator doesn't know other's haven't seen their message yet, if db persistence errors, then show errors

    To read later (socket.io react component):
      https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
      https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial
      https://www.fullstacklabs.co/blog/chat-application-react-express-socket-io
      https://www.valentinog.com/blog/socket-react/
    */

  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};
