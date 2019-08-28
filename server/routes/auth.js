class User {
  constructor(username, birthdate, age, email, password) {
    this.username = username;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

module.exports = function (app, userList) {
  app.post('/api/auth', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var email = req.body.email;
    var password = req.body.password;

        userList.filter(function (user) {
          if (user.email == email && user.password == password) {
            var userRes = {
              username: user.username,
              email: user.email,
              valid: true
            }
            res.send(userRes);
          }
        });
  });
};