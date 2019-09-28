var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.addChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db("meanchat");
    var channel = req.body;
    var userID = new ObjectID(channel.user);
    db.collection("channels").insertOne(channel, function (err, result) {
      console.log("Created the following channel:");
          db.collection("users", (err, collection) => {
            collection.updateOne({ _id: userID }, {
              $push: {
                groupChannels: channel.group + '-' + channel.channel,
              }
            }, (err, result) => {
              console.log("for the documents with", userID);
              collection.findOne({ _id: userID }, (err, document) => {
                res.send(document);
              });
              client.close();
            });
          });
    });
  });
};

exports.removeChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    let userID = ObjectID(req.body.user);
    let channel = req.body;
    let str = channel.channel.split('-');
    let groupChannel = str[1];
    let a = str[0];
    let query = { group: a, channel:groupChannel };
    console.log(query);
    db.collection("channels", (err, collection) => {
      collection.deleteOne(query, (err, result) => {
        console.log("Removed the channel with ID: ", query);

        db.collection("users", (err, collection) => {
          collection.updateOne({ _id: userID }, { 
            $pull: {
              groupChannels: channel.channel,
              }
            }, (err, result) => {
              console.log("for the documents with", userID);
              db.collection("users", (err, collection) => {
              collection.findOne({ _id: userID }, (err, document) => {
                res.send(document);
                client.close();
              });
            });
          });
        });
      });
    });
  });
}
