let should = require('chai').should();
let request = require('supertest');
let sinon = require('sinon');
let app = require('../../app');
let userModel = require('../model/user.js');
const config = require('../../config/test');

// stub for user test cases
const modelStubFindUser = sinon.stub(userModel, 'findOne');
const modelStubFindUserById = sinon.stub(userModel, 'findById');
const modelStubSaveUser = sinon.stub(userModel.prototype, 'save');

// config data for user test cases
const userData = config.user;
const userSend = config.userSend;
const userLogin = config.userLogin;
const userPassword = config.userPassword;

//  testsuite
describe('Testing to register a user', function()
{
  beforeEach(function(done)
  {
    modelStubFindUser.withArgs({email: 'abc@gmail.com'}).yields(null, [userData]);
    modelStubFindUser.withArgs({email: 'abc1@gmail.com'}).yields(null, null);
    done();
  });
  before(function(done)
  {
    modelStubSaveUser.yields(null, [userData]);
    done();
  });
  //  testcase
  it('Should handle to check existing user request', function(done)
  {
    request(app)
    .post('/api/user/register')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(userData)
    .end(function(err, res)
    {
      should.not.exist(err);
      res.body.message.should.be.equal('Email id is already registered');
      done();
    });
  });
  //  testcase
  it('Should handle successfull registration request', function(done)
  {
    request(app)
    .post('/api/user/register')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(userSend)
    .end(function(err, res)
    {
      should.not.exist(err);
      res.body.success.should.be.equal(true);
      done();
    });
  });

  afterEach(function(done)
  {
    modelStubFindUser.reset();
    done();
  });

  after(function(done)
  {
    modelStubSaveUser.restore();
    done();
  });
});

//  testsuite
describe('Testing Authentication of a user', function()
{
  beforeEach(function(done)
  {
    modelStubFindUser.withArgs({email: 'abc1@gmail.com'}).yields(null, null);
    modelStubFindUser.withArgs({email: 'abc@gmail.com'}).yields(null, userLogin);
    done();
  });
  //  testcase
  it('Should handle to check user into database request', function(done)
  {
    request(app)
    .post('/api/user/login')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(userSend)
    .end(function(err, res)
    {
      should.not.exist(err);
      res.body.message.should.be.equal('You are not registered user');
      done();
    });
  });
  //  testcase
  it('Should handle incorrect password request', function(done)
  {
    request(app)
    .post('/api/user/login')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(userPassword)
    .end(function(err, res)
    {
      should.not.exist(err);
      res.body.message.should.be.equal('Passwords is incorrect');
      done();
    });
  });
  //  testcase
  it('Should handle successfull login request', function(done)
  {
    request(app)
    .post('/api/user/login')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(userData)
    .end(function(err, res)
    {
      should.not.exist(err);
      res.body.success.should.be.equal(true);
      done();
    });
  });

  afterEach(function(done)
  {
    modelStubFindUser.reset();
    done();
  });
});

// user test cases ended here