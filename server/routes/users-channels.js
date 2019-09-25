var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.addUserToChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("channels", (err, collection) => {
      var channel = req.body;
      var channelID = new ObjectID(channel.id);
      collection.updateOne({ _id: channelID }, {
        $push: {
          users: channel.newUser
        }
      }, (err, result) => {
        console.log("for the documents with", channelID);
        res.send(result);
        client.close();
      });
    });
  });
};

exports.removeUserFromChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("channels", (err, collection) => {
      var channel = req.body;
      var channelID = new ObjectID(channel.id);
      collection.updateOne({ _id: channelID }, {
        $pull: {
          users: channel.userToRemove
        }
      }, (err, result) => {
        console.log("for the documents with", channelID);
        res.send(result);
        client.close();
      });
    });
  });
};