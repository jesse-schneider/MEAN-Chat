var fs = require('fs');

module.exports = function (app, userList, groups) {
  app.post('/api/removechannel', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    console.log(req.body);
    var userInd;

    for(i = 0; i < groups.length; i++) {
        var channelsArr = groups[i].channels;
        for(j = 0; j < channelsArr.length; j++) {
            if(channelsArr[j] == req.body.channel) {
                channelsArr.splice(j, 1);
            }
        }
        groups[i].channels = channelsArr;
    }

    for (i = 0; i < userList.length; i++) {
        var userArr = userList[i].groupChannels;
        if(userList[i].username == req.body.user) {
            userInd = i;
        }
        for (j = 0; j < userArr.length; j++) {
        if (userArr[j] == req.body.channel) {
            userArr.splice(j, 1);
            }
        }
        userList[i].channels = userArr;
    }
       fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
       fs.writeFileSync('./routes/channels.json', '{ \n"groups": [\n', 'utf8');
       for (i = 0; i < userList.length - 1; i++) {
         fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
       }
       for (i = 0; i < groups.length - 1; i++) {
         fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[i]) + ",\n", 'utf8');
       }
       fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
       fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[groups.length - 1]) + "\n", 'utf8');
       fs.appendFileSync('./routes/users.json', '] }', 'utf8');
       fs.appendFileSync('./routes/channels.json', '] }', 'utf8');
    
     res.send(userList[userInd]);
  });
};