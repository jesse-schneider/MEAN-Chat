var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectID;
const multer = require('multer');

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
    let id = new ObjectID(req.body.user);
    let query = { _id: id };
    db.collection("users", (err, collection) => {
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

exports.uploadImage = function (req, res) {
  var DIR = __dirname + '/img/';
  var upload = multer({ dest: DIR }).single('photo');
  var path = '';
  //grab incoming user details ready to store in mongoDB
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(422).send("an Error occured")
      }