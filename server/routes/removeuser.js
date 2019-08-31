var fs = require('fs');

module.exports = function (app, userList) {
  app.post('/api/removeuser', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    console.log(req.body);
    var removeInd;
    var response;

    for(i = 0; i < userList.length; i++) {
        if(userList[i].username == req.body.remove)
        {
            removeInd = i;
            userList.splice(removeInd, 1);
            response = "User Removed";
            break;
        }
        response = "User Did not exist";
    }

    fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
    for (i = 0; i < userList.length - 1; i++) {
      fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
    }
    fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
    fs.appendFileSync('./routes/users.json', '] }', 'utf8');
    res.send({response});
  });
};