var fs = require('fs');

module.exports = function (app, userList) {
  app.post('/api/adduser', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }

    var user = {
        username: req.body.username, 
        birthdate: req.body.birthdate, 
        age: req.body.age, 
        email: req.body.email,
        password: req.body.password,
        ofGroupAdminRole: JSON.parse(req.body.groupAdmin)
    };
    console.log(user);

    userList.push(user);
    //console.log(userList);
    try {
        fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
        for(i = 0; i < userList.length-1; i++)
        {
            fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
        }
        fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
        fs.appendFileSync('./routes/users.json', '] }', 'utf8');
    }
    catch {
        res.send("Error saving user");
    }
    return res.send(user);
  });
};