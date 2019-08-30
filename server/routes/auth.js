module.exports = function (app, userList) {
  app.post('/api/auth', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }

    var email = req.body.email;
    var password = req.body.password;

      userList.filter(function (user) {
        if (user.email == email && user.password == password) {
          if (user.email == 'super@test.com') {
            return res.send(userList);
          }
          var userObj = {
            username: user.username,
            email: user.email,
            valid: true
          }
          var userRes = [];
          userRes.push(userObj);
          return res.send(userRes);
        }
      });
  });
};