const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const username = " ";
const password = " ";
const connectionString = 'postgres://' + username + ':' + password + '@localhost:5432/ulabdb';
const db = pgp(connectionString);

//============================================
// Query functions
//============================================

function getAllWords(req, res, next) {
  db.any('select * from Words')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all words'
        })
    })
    .catch(function (err) {
      return next(err);
    })
}
module.exports = {
  getAllWords: getAllWords
}
