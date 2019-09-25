var express = require('express');
var fs = require('fs');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

var http = require('http').Server(app);
var app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var userList = JSON.parse(fs.readFileSync('./routes/users.json', 'utf8'))['users'];

//importing/requiring all the db operation api routes
var userDB = require('./routes/userDB.js');
var channelDB = require('./routes/channelDB.js');
var groupDB = require('./routes/groupDB.js');


//user db operation routes
app.post('/api/adduser', userDB.addUser);
app.post('/api/removeuser', userDB.removeUser);

//group db operation routes
app.post('/api/addgroup', groupDB.addGroup);
app.post('/api/removegroup', groupDB.removeGroup);

//channel db operation routes
app.post('/api/addchannel', channelDB.addChannel);
app.post('/api/removechannel', channelDB.removeChannel);


require('./routes/auth.js')(app, userList);
// require('./routes/adduserchannel.js')(app, userList);
// require('./routes/removeuserchannel.js')(app, userList);

app.listen(3000, () => {
  console.log("node server is listening on port 3000");
});