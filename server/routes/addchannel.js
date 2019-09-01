var fs = require('fs');

module.exports = function (app, groups, userList) {
  app.post('/api/addchannel', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var postedGroup = req.body.group;
    var postedChannel = req.body.channel;
    var userInd;

        for(i = 0; i < userList.length; i++) {
          if (userList[i].username == req.body.user) {
            userInd = i;
            break;
          }
        }
         userList[userInd].groupChannels.push(postedGroup+"-"+postedChannel);

        fs.writeFileSync('./routes/channels.json', '{ \n"groups": [\n', 'utf8');
        fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
        for (i = 0; i < groups.length - 1; i++) {
            fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[i]) + ",\n", 'utf8');
        }
        for (i = 0; i < userList.length - 1; i++) {
            fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
        }
        fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[groups.length - 1]) + "\n", 'utf8');
        fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
        fs.appendFileSync('./routes/channels.json', '] }', 'utf8');
        fs.appendFileSync('./routes/users.json', '] }', 'utf8');
      
        return res.send(userList[userInd]);
  });
};