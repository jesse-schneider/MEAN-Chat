var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.addChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db("meanchat");
    var channel = req.body;
    db.collection("channels").insertOne(channel, function (err, result) {
      console.log("Created the following channel:");
      console.log(channel);
      res.send(channel);
      client.close();
    });
  });
};

exports.removeChannel = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("channels", (err, collection) => {
      let id = ObjectID(req.body.id);
      let query = {_id: id };
      collection.deleteOne(query, (err, result) => {
        console.log("Removed the channel with ID: ", query);
        res.send(query);
        client.close();
      });
    });
  });
};