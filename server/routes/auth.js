module.exports = function (app, userList) {
  app.post('/api/auth', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var username = req.body.username;

      userList.filter(function (user) {
        if (user.username == username) {
          if (user.username == 'super') {
            return res.send(userList);
          }
          var userObj = {
            username: user.username,
            email: user.email,
            groupList: user.groupList,
            adminGroupList: user.adminGroupList,
            ofGroupAdminRole: user.ofGroupAdminRole,
            groupChannels: user.groupChannels,
            valid: true
          }
          var userRes = [];
          userRes.push(userObj);
          return res.send(userRes);
        }
      });
  });
};