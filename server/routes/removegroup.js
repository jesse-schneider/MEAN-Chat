var fs = require('fs');

module.exports = function (app, userList) {
  app.post('/api/removegroup', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var userInd;

    for (i = 0; i < userList.length; i++) {
      var groupListArr = userList[i].groupList;
      var adminGroupListArr = userList[i].adminGroupList;
      var channelsListArr = userList[i].groupChannels;
      if (userList[i].username == req.body.user) {
        userInd = i;
      }
      for (j = 0; j < groupListArr.length; j++) {
        if (groupListArr[j] === req.body.group) {
          groupListArr.splice(j, 1);
        }
        if (adminGroupListArr[j] === req.body.group) {
            adminGroupListArr.splice(j, 1);
        }
      }
    }
        for (i = 0; i < userList.length; i++) {
          var channelsListArr = userList[i].groupChannels;
          for (j = 0; j < channelsListArr.length; j++) {
              var str = channelsListArr[j].split('-');
            if (str[0] === req.body.group) {
              channelsListArr.splice(j, 1);
            }
          }
        }
    fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
    for (i = 0; i < userList.length - 1; i++) {
      fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
    }
    fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
    fs.appendFileSync('./routes/users.json', '] }', 'utf8');

    res.send(userList[userInd]);
  });
};