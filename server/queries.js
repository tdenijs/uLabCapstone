const promise = require('bluebird');

const options = {
  promiseLib: promise
};

//============================================
// Setup DB connection
//============================================

const pgp = require('pg-promise')(options);
const dbc = require('./.dbconfig');
const connectionString = 'postgres://' + dbc.user + ':' + dbc.password + '@' + dbc.hostname + ':' + dbc.port +'/' + dbc.dbname;
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
