var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.addUserToChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    var request = req.body;
    console.log(request);
    var user = new ObjectID(request.user);
    db.collection("users", (err, collection) => {
      
      collection.updateOne({ _id: user }, {
         $push: {
          groupChannels: request.channel
         }
      }, (err, result) => {
        console.log("for the documents with", user);
        res.send(result);
        client.close();
      });
    });
  });
};

exports.removeUserFromChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    var channel = req.body;
    var userID = new ObjectID(channel.user);
    console.log(channel);
    db.collection("users", (err, collection) => {
      collection.updateOne({ _id: userID }, {
        $pull: {
          groupChannels: channel.channel
        }
      }, (err, result) => {
        console.log("for the documents with", userID);
        res.send(result);
        client.close();
      });
    });
  });
};