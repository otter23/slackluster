//https://socket.io/docs/v4/server-application-structure/
const registerChannelHandlers = (io, socket) => {
  const addChannel = (newChannel) => {
    // ...
  };

  const updateChannel = (updatedChannel) => {
    // ...
  };

  const deleteChannel = (updatedChannel) => {
    // ...
  };

  socket.on('channel:add', addChannel);
  socket.on('channel:update', updateChannel);
  socket.on('channel:delete', deleteChannel);
};

module.exports = { registerChannelHandlers };
