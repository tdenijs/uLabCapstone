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
  db.any('select w.word_id, w.word, s.symbol_path, s.symbol_text from words w inner join symbols s on w.symbol_id = s.symbol_id')
    .then(function (data) {
      if (data.length > 0) {
      res.status(200)
        .json(data)
        console.log("All words were sent.")
      }
      else {
        res.status(404)
          .send("ERROR: No words found");
          console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllWordsByListName(req, res, next) {
  var lTitle = req.params.title;
  db.any("select l.list_id, l.list_title, lw.word_id, w.word, w.symbol_id, s.symbol_path, s.symbol_text "
         + "from lists l inner join listwords lw on l.list_id=lw.list_id "
         + "inner join words w on lw.word_id=w.word_id "
         + "inner join symbols s on w.symbol_id=s.symbol_id "
         + "where l.list_title=" + '\'' + lTitle + '\'')
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
          console.log("All words for list " + lTitle + " were sent.");
      } else {
        res.status(404)
        .send("ERROR: List " + '\'' + lTitle + '\' ' + "not found");
        console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}
module.exports = {
  getAllWords: getAllWords,
  getAllWordsByListName: getAllWordsByListName
}
