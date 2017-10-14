let should = require('chai').should();
let request = require('supertest');
let sinon = require('sinon');
let app = require('../../app');
let movieModel = require('../model/movie.js');

const modelStubFindMovies = sinon.stub(movieModel, 'find');
const modelStubDeleteMovie = sinon.stub(movieModel, 'remove');
const modelStubFindOneMovie = sinon.stub(movieModel, 'findOne');
const modelStubSaveMovie = sinon.stub(movieModel.prototype, 'save');
const config = require('../../config/test');

const data = config.movie;
const dataSend = config.movieSend;
const dataDelete = config.movieDelete;


//  testsuite
describe('Testing to search movies according to title', function() {
  this.timeout(10000);
  //  testcase
  it('Should handle to search movie request', function(done) {
    request(app)
    .get('/api/movie/search/superman')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.success.should.be.equal(true);
      done();
    });
  });
});

//  testsuite
describe('Testing to add a particular movie', function() {
  beforeEach(function(done)
  {
    modelStubFindOneMovie.withArgs({imdbID: 1924, userId: 'abc@gmail.com'}).yields(null, [data]);
    modelStubFindOneMovie.withArgs({imdbID: 1925, userId: 'abc@gmail.com'}).yields(null, null);
    done();
  });
  before(function(done)
  {
    modelStubSaveMovie.yields(null, [data]);
    done();
  });
  //  testcase
  it('Should handle to check movie is already exist', function(done) {
    request(app)
    .post('/api/movie/add')
    .expect(200)
    .send(data)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.message.should.be.equal('Movie is already exist');
      done();
    });
  });
  //  testcase
  it('Should handle to add a movie request', function(done) {
    request(app)
    .post('/api/movie/add')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(dataSend)
    .end(function(err, res)
    {
      should.not.exist(err);
      res.body.success.should.be.equal(true);
      done();
    });
  });
  afterEach(function(done) {
    modelStubFindOneMovie.reset();
    done();
  });
  after(function(done) {
    modelStubSaveMovie.reset();
    done();
  });
});

//  testsuite
describe('Testing to get all movies', function() {
  before(function(done)
  {
    modelStubFindMovies.yields(null, [data]);
    done();
  });
  //  testcase
  it('Should handle to get all movies request', function(done) {
    request(app)
    .post('/api/movie/view')
    .expect(200)
    .send({userId: 'abc@gmail.com'})
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.success.should.be.equal(true);
      done();
    });
  });
  after(function(done)
  {
    modelStubFindMovies.reset();
    done();
  });
});

//  testsuite
describe('Testing to delete a movie', function()
{
  before(function(done)
  {
    modelStubDeleteMovie.yields(null, [data]);
    done();
  });
  //  testcase
  it('Should handle to delete a movie request', function(done)
  {
    request(app)
    .delete('/api/movie/delete')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(dataDelete)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.success.should.be.equal(true);
      done();
    });
  });
  after(function(done)
  {
    modelStubDeleteMovie.reset();
    done();
  });
});