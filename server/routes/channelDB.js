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
};

exports.getChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    var db = client.db("meanchat");
    let channelObj = req.body.channel;
    console.log(channelObj);
    let str = channelObj.split('-');
    let groupChannel = str[1];
    let group = str[0];
    var query = { channel: String(groupChannel) };
    db.collection("channels").find(query).toArray((err, result) => {
      if (err) throw err;
      res.send(result[0]);
      client.close();
    });
  });
}

exports.updateChannel = function (req, res) {
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    let channel = req.body;
    let channelID = new ObjectID(channel.id);
    db.collection("channels", (err, collection) => {
      collection.updateOne({ _id: channelID }, {
        $push: {
          messages: channel.message
        }
      }, (err, result) => {
        console.log("For document containing: ", channelID);
        res.send({success: channelID});
        client.close();
      });
    });
  });
};