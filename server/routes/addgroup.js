var fs = require('fs');

module.exports = function (app, userList) {
    app.post('/api/addgroup', (req, res) => {
        if (!req.body) {
        return res.sendStatus(400);
        }

    userList.filter(function (user) {
        if (req.body.username == user.username && req.body.email == user.email) {
            user.groupList = req.body.groupList;
            user.adminGroupList = req.body.adminGroupList;
           }
        });
    try {
      fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
      for (i = 0; i < userList.length - 1; i++) {
        fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
      }
      fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
      fs.appendFileSync('./routes/users.json', '] }', 'utf8');
    } catch {
      res.send("Error saving user");
    }
    return res.send({response: 'group saved'});
  });
};