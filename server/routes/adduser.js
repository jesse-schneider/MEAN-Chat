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
        password: req.body.password
    };

    userList.push(user);
    console.log(userList);
    try{
        fs.writeFileSync('./routes/users.json', JSON.stringify(userList), 'utf8');
    }
    catch{
        res.send("Error saving user");
    }
    return res.send("User Added Successfully");
  });
};