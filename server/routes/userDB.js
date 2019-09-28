var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectID;

//add a user from a JSON Object
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

//find and remove a selected user
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

//authentication function -> find requested user and return, or else return error
exports.authenticate = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db("meanchat");
    var query = {
      username: req.body.username,
      password: req.body.password
    };
    db.collection("users").find(query).toArray((err, user) => {
      if (err) throw err;
      res.send(user);
      client.close();
    });
  });
};

//authentication function -> find requested user and return, or else return error
exports.allUsers = function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    var db = client.db("meanchat");
    db.collection("users").find({}).toArray((err, users) => {
      if (err) throw err;
      res.send(users);
      client.close();
    });
  });
};

