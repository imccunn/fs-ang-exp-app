'use strict';

process.env.MONGO_URI = 'mongodb://localhost/compositionapp_dev';

var mongoose = require('mongoose'),
    chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect,
    server = 'localhost:3333/api/v1';

chai.use(chaihttp);
require('../server.js');

describe('Compositions API endpoint tests (compositions/)', function () {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });

  it('Should handle POST request and send sent data back', function (done) {
    chai.request(server)
      .post('/compositions')
      .send({title: 'test title', subtitle: 'test subtitle'})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.title).to.eql('test title');
        expect(res.body.subtitle).to.eql('test subtitle');
        done();
      });
  });

  describe('Tests with data already in database:', function () {
    var id;
    beforeEach(function (done) {
      chai.request(server)
        .post('/compositions')
        .send({title: 'test title'})
        .end(function (err, res) {
          id = res.body._id;
          done();
        });
    });

    it('GET request should respond with appropriate data.', function (done) {
      chai.request(server)
        .get('/compositions')
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body[0]).to.have.property('title');
          done();
        });
    });

    it('PUT request should update database entry and send updated data back.', function (done) {
      chai.request(server)
        .put('/compositions/' + id)
        .send({title: 'test title'})
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.title).to.eql('test title');
          done();
        });
    });

    it('DELETE request should remove a resource and send a success message back.', function (done) {
      chai.request(server)
        .delete('/compositions/' + id)
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('Successfully removed composition.');
          done();
        });
    });
  });
});
