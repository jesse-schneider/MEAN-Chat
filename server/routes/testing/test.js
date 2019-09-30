const assert = require('assert');
const server = require('../../server.js');
const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const ObjectID = require('mongodb').ObjectID;

chai.use(chaiHttp);

describe('API Integration Test', () => {
  before(() => {
    console.log('Before test');
  });

  after(() => {
    console.log('After test');
  });


  //test GET /api/getallusers
  describe('GET /api/getallusers', () => {
    it('should return users array', (done) => {
      chai.request(server)
        .get('/api/getallusers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
      done();
    });
  });

  //test POST /api/adduser
  describe('POST /api/adduser', () => {
    it('it should create a new user', (done) => {
      chai.request(server).post('/api/adduser').type('form').send({
           'username': 'Jesse',
            'email': 'test@test.com',
            'password': 'test',
            'groupAdmin': false,
            'groupAssis': false,
            'groupList': false,
            'adminGroupList': false,
            'groupChannels': false,
            'profilePicLocation': "img\default-avatar.jpg"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username');
          res.body.should.have.property('profilePicLocation');
          done();
        });
      done();
    });
  });

  //test POST /api/removeuser
  describe('POST /api/removeuser', () => {
    it('it should remove a user', (done) => {
      chai.request(server).post('/api/removeuser').type('form').send({
          'user': '5d9025bfd533150d5cae8578'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          done();
        });
      done();
    });
  });

  //test POST /api/auth
  describe('POST /api/auth', () => {
    it('it should login on correct credentials', (done) => {
      chai.request(server).post('/api/auth').type('form').send({
          'username': 'test',
          'password': 'test'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
      done();
    });
  });

  //test POST /api/getuserimage
  describe('POST /api/getuserimage', () => {
    it('should return image name', (done) => {
      chai.request(server).post('/api/getuserimage').type('form').send({
          'user':  '5d8b35431886a30fd0bdc4b1'
      })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('picture');
          done();
        });
      done();
    });
  });

    //test POST /api/addgroup
    describe('POST /api/addgroup', () => {
      it('it should add a group to a user', (done) => {
        chai.request(server).post('/api/addgroup').type('form').send({
            'id': '5d831b2de045870660a15ff5',
            'newGroup': 'IntegrationTest'
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });

    //test POST /api/removegroup
    describe('POST /api/removegroup', () => {
      it('it should remove a group from a user', (done) => {
        chai.request(server).post('/api/removegroup').type('form').send({
            'id': '5d831b2de045870660a15ff5',
            'group': 'IntegrationTest'
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });

    //test POST /api/getgroups
    describe('POST /api/getgroups', () => {
      it('it should return all groups for a user', (done) => {
        chai.request(server).post('/api/getgroups').type('form').send({
            'id': '5d8b35431886a30fd0bdc4b1',
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });

    //test POST /api/addchannel
    describe('POST /api/addchannel', () => {
      it('it should create a new channel', (done) => {
        chai.request(server).post('/api/addchannel').type('form').send({
            'user': '5d8b35431886a30fd0bdc4b1',
            'group': 'Test',
            'channel': 'test',
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });

    //test POST /api/removechannel
    describe('POST /api/removechannel', () => {
      it('it should remove a channel', (done) => {
        chai.request(server).post('/api/removechannel').type('form').send({
            'user': '5d831b2de045870660a15ff5',
            'channel': 'Test-Test'
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });

  //test POST /api/getchannel
  describe('POST /api/getchannel', () => {
    it('it should return full channel object', (done) => {
      chai.request(server).post('/api/getchannel').type('form').send({
          'channel': 'PostmanAPITest3-Test'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      done();
    });
  });

    //test POST /api/updatechannel
    describe('POST /api/updatechannel', () => {
      it('it should update a channel', (done) => {
        chai.request(server).post('/api/updatechannel').type('form').send({
            '_id': '5d91e76f86c6104bc45bd106'
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });

    //test POST /api/adduserchannel
    describe('POST /api/adduserchannel', () => {
      it('it should add a channel to a user', (done) => {
        chai.request(server).post('/api/adduserchannel').type('form').send({
            'user': '5d90201e9ceaf24b6803b5d6',
            'channel': 'Test-test'
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });

    //test POST /api/removeuserchannel
    describe('POST /api/removeuserchannel', () => {
      it('it should add a channel to a user', (done) => {
        chai.request(server).post('/api/removeuserchannel').type('form').send({
            'user': '5d90201e9ceaf24b6803b5d6',
            'channel': 'Test-test'
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        done();
      });
    });
});