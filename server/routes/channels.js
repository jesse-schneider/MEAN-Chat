module.exports = function (app, groups) {
  app.post('/api/channel', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var resObject = {};

    for(i = 0; i < groups.length; i++) {
        if(groups[i].group == req.body.group) {
            resObject = groups[i];
            break;
        }
    }

    return res.send(resObject);
  });
};