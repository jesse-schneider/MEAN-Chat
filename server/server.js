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
 var groups = JSON.parse(fs.readFileSync('./routes/channels.json', 'utf8'))['groups'];

require('./routes/auth.js')(app, userList);
require('./routes/adduser.js')(app, userList);
require('./routes/addgroup.js')(app, userList, groups);
require('./routes/addchannel.js')(app, groups, userList);
require('./routes/channels.js')(app, groups);
require('./routes/removechannel.js')(app, userList, groups);
require('./routes/removeuser.js')(app, userList);
require('./routes/removegroup.js')(app, userList, groups);
require('./routes/adduserchannel.js')(app, userList);
// require('./routes/removeuserchannel.js')(app, userList);

app.listen(3000, () => {
  console.log("node server is listening on port 3000");
});