//npm modules
var express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

//app middleware
var app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var dir = path.join(__dirname, 'img');
app.use(express.static(dir));

//importing/requiring all the db operation api routes
var userDB = require('./routes/userDB.js');
var channelDB = require('./routes/channelDB.js');
var groupDB = require('./routes/groupDB.js');
var usersChannels = require('./routes/users-channels.js');

//user db operation routes
app.post('/api/adduser', userDB.addUser);
app.post('/api/removeuser', userDB.removeUser);
app.post('/api/auth', userDB.authenticate);
app.get('/api/getallusers', userDB.allUsers);
app.post('/api/uploadimage', userDB.uploadImage);
app.post('/api/getuserimage', userDB.getImage);

//group db operation routes
app.post('/api/addgroup', groupDB.addGroup);
app.post('/api/removegroup', groupDB.removeGroup);
app.post('/api/getgroups', groupDB.getGroups);

//channel db operation routes
app.post('/api/addchannel', channelDB.addChannel);
app.post('/api/removechannel', channelDB.removeChannel);
app.post('/api/getchannel', channelDB.getChannel);
app.post('/api/updatechannel', channelDB.updateChannel);

//add/remove user to/from channel routes
app.post('/api/adduserchannel', usersChannels.addUserToChannel);
app.post('/api/removeuserchannel', usersChannels.removeUserFromChannel);

//adding sockets.io to API server
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

//on connection, show connection, on message emit message
io.on('connection', (socket) => {
  console.log(`User connection on port ${PORT}: ${socket.id}`);

  socket.on('join', (data) => {
    socket.join(data.channel);
    socket.emit('join', { creatorName: 'Admin:', creatorImg: "default-avatar.jpg", content: " You joined the channel." });
  });

  //emit message to correct sockets 
  socket.on('message', (data) => {
    io.in(data.channel).emit('message', {creatorName: data.creatorName, creatorImg: data.creatorImg, content: data.content, createdAt: data.createdAt});
  });

  socket.on('image', (data) => {
    io.in(data.channel).emit('image', { creatorName: data.creatorName, creatorImg: data.creatorImg, imgContent: data.content, createdAt: data.createdAt });

  });
});

//listen on http sockets.io server
module.exports = http.listen(PORT, () => {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  console.log(`Server has been started on port ${PORT} at ${hour}:${minute}`);
});