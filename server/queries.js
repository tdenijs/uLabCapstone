const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/ulabdb';
const db = pgp(connectionString);

//============================================
// Query functions
//============================================

module.exports = {
  getAllWords: getAllWords
}
