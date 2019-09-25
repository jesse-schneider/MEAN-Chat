var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

//add a group
exports.addGroup = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("users", (err, collection) => {
      var group = req.body;
      var userID = new ObjectID(group.id);
      collection.updateOne({ _id: userID }, {
        $push: {
          groupList: group.newGroup,
          adminGroupList: group.newGroup
        }
      }, (err, result) => {
        console.log("for the documents with", userID);
        res.send(result);
        client.close();
      });
    });
  });
};


//remove a group 
exports.removeGroup = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("users", (err, collection) => {
      var groupToRemove = req.body.groupToRemove;
      collection.updateMany({}, {
        $pull: {
          groupList: groupToRemove,
          adminGroupList: groupToRemove
        }
      }, (err, result) => {
        console.log("removed group: ", groupToRemove);
        res.send(result);
        client.close();
      });
    });
  });
};

//get all groups
exports.getGroups = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db("meanchat");
    var user = req.body;
    var userID = new ObjectID(user.id);
    console.log(req.body);
    db.collection("users").find({ _id: userID }).toArray((err, groups) => {
      console.log(groups);
      if (err) throw err;
      res.send(groups[0].groupList);
      client.close();
    });
  });
};