let crypto = require('crypto');

let SaltLength = 9;

function generateSalt(len) {
  let set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  let setLen = set.length;
  let salt = '';
  for (let i = 0; i < len; i = i + 1) {
    let p = Math.floor(Math.random() * setLen);
    salt = salt + set[p];
  }
  return salt;
}

function md5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

function createHash(password, callback) {
  let salt = generateSalt(SaltLength);
  let hash = md5(password + salt);
  callback(null, salt + hash);
}

function validateHash(hash, password, callback) {
  let salt = hash.substr(0, SaltLength);
  let validHash = salt + md5(password + salt);
  callback(null, hash === validHash);
}

module.exports = {
  hash: createHash,
  validate: validateHash
};