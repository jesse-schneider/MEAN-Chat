var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.addGroup = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db("meanchat");
    var group = req.body;
    db.collection("groups").insertOne(group, function (err, result) {
      console.log("Created the following group:");
      console.log(group);
      res.send(group);
      client.close();
    });
  });
};

exports.removeGroup = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("groups", (err, collection) => {
      let id = ObjectID(req.body.id);
      let query = { _id: id };
      collection.deleteOne(query, (err, result) => {
        console.log("Removed the group with ID: ", query);
        res.send(query);
        client.close();
      });
    });
  });
};


// var fs = require('fs');
// module.exports = function (app, userList) {
//     app.post('/api/addgroup', (req, res) => {
//         if (!req.body) {
//         return res.sendStatus(400);
//         }

//     userList.filter(function (user) {
//         if (req.body.username == user.username && req.body.email == user.email) {
//             user.groupList = req.body.groupList;
//             user.adminGroupList = req.body.adminGroupList;
//            }
//         });

//     try {
//       fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
//       for (i = 0; i < userList.length - 1; i++) {
//         fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
//       }
//       fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
//       fs.appendFileSync('./routes/users.json', '] }', 'utf8');
//     } catch {
//       res.send("Error saving user");
//     }
//     return res.send({response: 'group saved'});
//   });
// };