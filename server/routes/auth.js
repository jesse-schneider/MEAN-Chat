module.exports = function (app, userList) {
  app.post('/api/auth', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }

    console.log(req.body);
    var username = req.body.username;

      userList.filter(function (user) {
        if (user.username == username) {
          console.log(user);
          if (user.username == 'super') {
            return res.send(userList);
          }
          var userObj = {
            username: user.username,
            email: user.email,
            groupList: user.groupList,
            adminGroupList: user.adminGroupList,
            ofGroupAdminRole: user.ofGroupAdminRole,
            valid: true
          }
          var userRes = [];
          userRes.push(userObj);
          return res.send(userRes);
        }
      });
  });
};