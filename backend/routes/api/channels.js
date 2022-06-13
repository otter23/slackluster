// api/channels

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Channel, User, UsersChannels, Message } = require('../../db/models');

//error validation functions
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');

//GET ALL CHANNELS IN DATABASE
router.get(
  '/',
  asyncHandler(async (req, res) => {
    //query db for all channels
    const channels = await Channel.findAll({ order: [['name', 'asc']] });

    let channelByChannelId = {};
    channels.forEach((channel) => {
      channelByChannelId[channel.id] = channel;
    });

    return res.json({ allChannels: channels, channelByChannelId });
  })
);

//GET CHANNEL BY ID
router.get(
  '/:channelId(\\d+)',
  asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const channel = await Channel.findByPk(channelId);

    return res.json(channel);
  })
);

//validation for the channel creation form
// description can be null and unlimited length
const validateChannel = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Don’t forget to name your channel.')
    .isLength({ max: 80 })
    .withMessage('Channel names can’t be longer than 80 characters.')
    .matches(/^[\w-]+$/i, 'g')
    .withMessage(
      'Channel names can’t contain spaces, periods, or most punctuation. Try again?'
    )
    .custom(async (value, { req }) => {
      //only check if update route, not add route (note: could use req.params instead)
      if (req.body.channelId) {
        const currentChannel = await Channel.findByPk(req.body.channelId);
        //check if name exists in db
        const namedChannel = await Channel.findOne({ where: { name: value } });

        //if name same as previous, or no records found do nothing, else reject
        if (currentChannel?.name === namedChannel?.name || !namedChannel)
          return;
        else return Promise.reject('Channel name already exists');
      }
      return;
    }),
  check('topic')
    .isLength({ max: 250 })
    .withMessage(
      'Channel topics can only include up to 250 characters — please make this topic shorter.'
    ),
  check('description')
    .isLength({ max: 250 })
    .withMessage(
      'Channel descriptions can only include up to 250 characters — please make this description shorter.'
    ),
  handleValidationErrors,
];

//ADD CHANNEL - LOGGED-IN USER ONLY
router.post(
  '/',
  requireAuth, //if no user info in verified jwt, then will throw error
  validateChannel, //if validation errors, errors thrown with array of error messages
  asyncHandler(async (req, res) => {
    //using sessionUserId ensures will only succeed if requireAuth succeeds
    const sessionUserId = parseInt(req.user.id, 10);
    //user not allowed to update isPrivate for now
    const { ownerId, name, topic, description } = req.body;

    const lowerName = name.toLowerCase();

    if (sessionUserId === ownerId) {
      const newChannel = await Channel.create({
        ownerId,
        name: lowerName,
        topic,
        description,
        // isPrivate: false,
      });

      const io = req.app.get('socketio');
      io.emit('channel:add', { newChannel });
      // const socket = req.app.get('socket');
      // socket.broadcast.emit('channel:add', { newChannel });

      return res.json(newChannel);
      // return res.redirect(`${req.baseUrl}/${newChannel.id}`);
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

//UPDATE CHANNEL - LOGGED-IN USER ONLY
router.patch(
  '/:channelId(\\d+)',
  requireAuth,
  validateChannel,
  asyncHandler(async (req, res) => {
    const sessionUserId = parseInt(req.user.id, 10);
    const channelId = req.params.channelId;

    const channelToUpdate = await Channel.findByPk(channelId);

    if (!channelToUpdate) {
      res.status(422);
      return res.json({ errors: 'Channel not found' });
    }

    const { name, topic, description } = req.body;
    //user not allowed to update isPrivate for now

    const lowerName = name.toLowerCase();

    //check if channel belongs to signed in user
    if (sessionUserId === channelToUpdate.ownerId) {
      const updatedChannel = await channelToUpdate.update({
        name: lowerName,
        topic,
        description,
        // isPrivate: false,
      });

      const io = req.app.get('socketio');
      io.emit('channel:update', { updatedChannel });
      // const socket = req.app.get('socket');
      // socket.broadcast.emit('channel:update', { updatedChannel });

      return res.json(updatedChannel);
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

//DELETE CHANNEL - LOGGED-IN USER ONLY
router.delete(
  '/:channelId(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    //grab id of logged in user
    const sessionUserId = parseInt(req.user.id, 10);
    const channelId = req.params.channelId;

    const channelToDelete = await Channel.findByPk(channelId);

    if (!channelToDelete) {
      res.status(422);
      return res.json({ errors: 'Channel not found' });
    }

    //check if channel belongs to signed in user
    if (sessionUserId === channelToDelete.ownerId) {
      //Destroy Channels dependencies first:
      // //find all threads associated to the threadId
      // const messageAssociations = await UserChannel.findAll({
      //   where: { channelId },
      // });
      //find all messages associated with the channelId
      const channelMessages = await Message.findAll({
        where: { channelId },
      });

      //if associations exist destroy them
      if (channelMessages.length > 0) {
        await Message.destroy({ where: { channelId } });
      }

      // once dependencies destroyed, delete Channel from database
      await Channel.destroy({ where: { id: channelId } });

      const io = req.app.get('socketio');
      io.emit('channel:delete', {
        message: 'Success',
        ownerId: channelToDelete.ownerId,
        channelId,
      });
      // const socket = req.app.get('socket');
      // socket.broadcast.emit('channel:delete', {
      //   message: 'Success',
      //   ownerId: channelToDelete.ownerId,
      //   channelId,
      // });

      return res.json({ message: 'Success' });
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

//GET ALL CHANNEL MESSAGES by channelId
router.get(
  '/:channelId(\\d+)/messages',
  asyncHandler(async (req, res) => {
    //grab id of channel
    const channelId = req.params.channelId;

    //query db for all messages that belong to channel
    const messages = await Message.findAll({
      where: { channelId },
      order: [['createdAt', 'ASC']],
    });

    return res.json(messages);
  })
);

module.exports = router;

//Test Routes

//GET ALL CHANNELS
// fetch("/api/channels").then( res => res.json() ).then(data => console.log(data) )

//GET ALL USER CHANNELS
// fetch("/api/users/1/channels").then( res => res.json() ).then(data => console.log(data) )

//GET ONE CHANNEL BY ID
// fetch("/api/channels/2").then( res => res.json() ).then(data => console.log(data) )

//POST
// csrfFetch('/api/channels', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     ownerId: 1,
//     name: 'added-channel',
//     topic: null,
//     description: null,
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//PATCH
// csrfFetch('/api/channels/5', {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     name: 'UPDATED-channel',
//     topic: 'UPDATED',
//     description: 'UPDATED',
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// DELETE CHANNEL
// csrfFetch('/api/channels/5', {
//   method: 'DELETE',
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//GET ALL CHANNEL MESSAGES
// fetch("/api/channels/1/messages").then( res => res.json() ).then(data => console.log(data) )
