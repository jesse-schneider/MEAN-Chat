var fs = require('fs');

module.exports = function (app, userList, groups) {
    app.post('/api/addgroup', (req, res) => {
        if (!req.body) {
        return res.sendStatus(400);
        }

    userList.filter(function (user) {
        if (req.body.username == user.username && req.body.email == user.email) {
            user.groupList = req.body.groupList;
            user.adminGroupList = req.body.adminGroupList;
            for(i = 0; i < user.groupList.length; i++) {
              var foundGroup = false;
              for(j = 0; j < groups.length; j++) {
                if(groups[j].group == user.groupList[i]) {
                  foundGroup = true;
                  break;
                }
              }
              if(foundGroup == false) {
                groups.push(JSON.parse("{ \"group\": \"" + user.groupList[i] + "\", \"channels\": [] }"));
              }
            }
           }
        });

    try {
      fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
      fs.writeFileSync('./routes/channels.json', '{ \n"groups": [\n', 'utf8');
      for (i = 0; i < userList.length - 1; i++) {
        fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
      }
      for(i = 0; i < groups.length - 1; i++) {
        fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[i]) + ",\n", 'utf8');
      }
      fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
      fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[groups.length - 1]) + "\n", 'utf8');
      fs.appendFileSync('./routes/users.json', '] }', 'utf8');
      fs.appendFileSync('./routes/channels.json', '] }', 'utf8');
    } catch {
      res.send("Error saving user");
    }
    return res.send({response: 'group saved'});
  });
};