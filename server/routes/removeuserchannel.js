var fs = require('fs');

module.exports = function (app, userList) {
  app.post('/api/removeuserchannel', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var response;
    var channelToRemove = req.body.channel;

    for (i = 0; i < userList.length; i++) {
        
      if (userList[i].username === req.body.user) {
          var channelList = userList[i].groupChannels;
          for(j = 0; j < channelList.length; j++) {
              if (channelToRemove === channelList[j]) {
                  channelList.splice(j, 1);
              }
          }
        response = "Channel Removed from User";
        break;
      }
      response = "Channel did not exist";
    }

    fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
    for (i = 0; i < userList.length - 1; i++) {
      fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
    }
    fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
    fs.appendFileSync('./routes/users.json', '] }', 'utf8');
    res.send({
      response
    });
  });
};