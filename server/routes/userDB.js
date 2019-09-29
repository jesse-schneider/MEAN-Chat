var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const path = require('path');

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

//upload image to user
exports.uploadImage = function (req, res) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './img/')
    },
    filename: function (req, file, cb) {
      console.log(file.mimetype);
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, Date.now() + extension) 
    }
  })
  
  var upload = multer({ storage: storage }).single('photo');
  var path = '';

    upload(req, res, (err) => {
      var user = new ObjectID(req.body.user);
      if (err) {
        console.log(err);
        return res.status(422).send("an Error occured");
      }
      path = req.file.path;

      //save path to mongoDB
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
          let db = client.db("meanchat");
          db.collection("users", (err, collection) => {
            collection.updateOne({ _id: user }, {
              $set: {
                profilePicLocation: path
              }
            }, (err, result) => {
              collection.findOne({ _id: user }, (err, document) => {
                return res.send(document);
              });
              client.close();
            });
          });
        });
    });
  };

  //get image name from server
exports.getImage = function(req, res) {
  let user = new ObjectID(req.body.user);
  console.log(req.body);
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("meanchat");
    db.collection("users", (err, collection) => {
        collection.findOne({  _id: user }, (err, document) => {
          var str = document.profilePicLocation.split('\\');
          var URL = str[1];
          return res.send({picture: URL});
        });
        client.close();
      });
    });
};
