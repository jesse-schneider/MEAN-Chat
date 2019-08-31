var fs = require('fs');

module.exports = function (app, groups) {
  app.post('/api/addchannel', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }

    var postedGroup = req.body.group;

    groups.filter(function (group) {
        if (postedGroup == group.group) {
            group.channels = [];
            for(i = 0; i < req.body.channels.length; i++)
            {
                group.channels.push(req.body.channels[i]);
            }
          }
        });

        fs.writeFileSync('./routes/channels.json', '{ \n"groups": [\n', 'utf8');
        for (i = 0; i < groups.length - 1; i++) {
            fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[i]) + ",\n", 'utf8');
        }
        fs.appendFileSync('./routes/channels.json', "\t" + JSON.stringify(groups[groups.length - 1]) + "\n", 'utf8');
        fs.appendFileSync('./routes/channels.json', '] }', 'utf8');
      
        return res.send(req.body);
  });
};