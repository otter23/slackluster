// api/messages

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Message } = require('../../db/models');

//error validation functions
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');

//GET ALL MESSAGES IN DATABASE
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const messages = await Message.findAll({ order: [['createdAt', 'ASC']] });

    let messageByMessageId = {};
    messages.forEach((message) => {
      messageByMessageId[message.id] = message;
    });

    let messagesByChannelId = {};
    messages.forEach((message) => {
      if (message.channelId in messagesByChannelId) {
        messagesByChannelId[message.channelId].push(message);
      } else {
        messagesByChannelId[message.channelId] = [];
        messagesByChannelId[message.channelId].push(message);
      }
    });

    return res.json({
      allMessages: messages,
      messageByMessageId,
      messagesByChannelId,
    });
  })
);

//GET MESSAGE BY ID
router.get(
  '/:messageId(\\d+)',
  asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    const message = await Message.findByPk(messageId);

    return res.json(message);
  })
);

//GET MESSAGES BY CHANNEL_ID
router.get(
  '/channels/:channelId(\\d+)',
  asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const channelMessages = await Message.findAll({
      where: { channelId: channelId },
      order: [['createdAt', 'ASC']],
    });

    return res.json(channelMessages);
  })
);

//validation for the message creation form
const validateMessage = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a message'),
  handleValidationErrors,
];

//ADD MESSAGE - LOGGED-IN USER ONLY
router.post(
  '/',
  requireAuth, //if no user info in verified jwt, then will throw error
  validateMessage, //if validation errors, errors thrown with array of error messages
  asyncHandler(async (req, res) => {
    //using sessionUserId ensures will only succeed if requireAuth succeeds
    const sessionUserId = parseInt(req.user.id, 10);
    //user not allowed to update isPrivate for now
    const { ownerId, channelId, groupId, threadId, content } = req.body;

    if (sessionUserId === ownerId) {
      const newMessage = await Message.create({
        ownerId,
        channelId,
        groupId,
        threadId,
        content,
      });

      // const io = req.app.get('socketio');
      // io.emit('chat', { msg: 'NEW MESSAGE ADDED' });
      // io.sockets.emit('chat', { msg: 'NEW MESSAGE ADDED' });
      const socket = req.app.get('socket');
      socket.emit('message:add', { newMessage });

      return res.json(newMessage);
      // return res.redirect(`${req.baseUrl}/${newMessage.id}`);
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

//UPDATE MESSAGE - LOGGED-IN USER ONLY
router.patch(
  '/:messageId(\\d+)',
  requireAuth,
  validateMessage,
  asyncHandler(async (req, res) => {
    const sessionUserId = parseInt(req.user.id, 10);
    const messageId = req.params.messageId;

    const messageToUpdate = await Message.findByPk(messageId);

    if (!messageToUpdate) {
      res.status(422);
      return res.json({ errors: 'Message not found' });
    }

    const { ownerId, channelId, groupId, threadId, content } = req.body;
    //user not allowed to update isPrivate for now

    //check if message belongs to signed in user
    if (sessionUserId === messageToUpdate.ownerId) {
      const updatedMessage = await messageToUpdate.update({
        ownerId,
        channelId,
        groupId,
        threadId,
        content,
      });

      const socket = req.app.get('socket');
      socket.emit('message:update', { updatedMessage });

      return res.json(updatedMessage);
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

//DELETE MESSAGE - LOGGED-IN USER ONLY
router.delete(
  '/:messageId(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    //grab id of logged in user
    const sessionUserId = parseInt(req.user.id, 10);
    const messageId = req.params.messageId;

    const messageToDelete = await Message.findByPk(messageId);

    if (!messageToDelete) {
      res.status(422);
      return res.json({ errors: 'Message not found' });
    }

    //check if message belongs to signed in user
    if (sessionUserId === messageToDelete.ownerId) {
      //Destroy MEssage dependencies first:
      //if associations exist destroy them

      // once dependencies destroyed, delete message from database
      await Message.destroy({ where: { id: messageId } });

      const socket = req.app.get('socket');
      socket.emit('message:delete', {
        message: 'Success',
        ownerId: messageToDelete.ownerId,
        messageId,
        channelId: messageToDelete.channelId,
      });

      return res.json({ message: 'Success' });
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

module.exports = router;

//Test Routes

//GET ALL MESSAGES
// fetch("/api/messages").then( res => res.json() ).then(data => console.log(data) )

//GET ALL USER MESSAGES by ownerId - DID NOT BUILD
// fetch("/api/users/1/messages").then( res => res.json() ).then(data => console.log(data) )

//GET ONE MESSAGE BY ID
// fetch("/api/messages/2").then( res => res.json() ).then(data => console.log(data) )

//POST
// csrfFetch('/api/messages', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     ownerId: 1,
//     channelId: 2,
//     content: "test"
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//PATCH
// csrfFetch('/api/messages/11', {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     ownerId: 1,
//     channelId: 3,
//     content: "UPDATE"
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// DELETE
// csrfFetch('/api/messages/11', {
//   method: 'DELETE',
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
