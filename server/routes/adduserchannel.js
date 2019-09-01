var fs = require('fs');

module.exports = function (app, userList) {
  app.post('/api/adduserchannel', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var postedGroup = req.body.group;
    var postedChannel = req.body.channel;
    var postedUser = req.body.user;
    var userInd;

    for (i = 0; i < userList.length; i++) {
      if (userList[i].username === postedUser) {
        userInd = i;
        break;
      }
    }

     userList[userInd].groupChannels.push(postedChannel);
    fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
    for (i = 0; i < userList.length - 1; i++) {
      fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
    }
    fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
    fs.appendFileSync('./routes/users.json', '] }', 'utf8');

    return res.send(userList[userInd]);
  });
};