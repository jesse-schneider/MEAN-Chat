var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.addUser = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db("meanchat");
    var user = req.body
    db.collection("users").insertOne(user, function (err, result) {
      console.log("Created user:");
      console.log(user);
      res.send(user);
      client.close();
    });
  });
};


exports.removeUser = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("users", (err, collection) => {
      let id = ObjectID(req.body.id);
      let query = {_id: id };
      collection.deleteOne(query, (err, result) => {
        console.log("Removed user with ID: ", query);
        res.send(query);
        client.close();
      });
    });
  });
};