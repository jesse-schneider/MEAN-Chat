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

require('./routes/auth.js')(app, userList);
require('./routes/adduser.js')(app, userList);
require('./routes/addgroup.js')(app, userList);

app.listen(3000, () => {
  console.log("node server is listening on port 3000");
});