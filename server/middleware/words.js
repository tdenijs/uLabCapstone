const db = require('../config/dbconnect');

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

// this fucntion returns a word which word_id is specific
// in the form
//      ["word_id": , "word": , "symbol_id": , "symbol_path": ]
function getWordByID(req, res, next) {
  var targetWordID = req.params.word_id;
  db.any('SELECT w.word_id, w.word, w.symbol_id, s.symbol_path '
       + 'FROM words w, symbols s '
       + 'WHERE w.word_id=' + '\'' + targetWordID + '\' '
       + 'AND w.symbol_id=s.symbol_id')
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
          console.log("the word which word_id is " + targetWordID + " were sent.");
      } else {
        res.status(404)
        .send("ERROR: word_id " + '\'' + targetWordID + '\' ' + "not found");
        console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

// this fucntion returns a word which word_name is specific
// in the form
//      ["word_id": , "word": , "symbol_id": , "symbol_path": ]
function getWordByName(req, res, next) {
  var targetWordName = req.params.word_name;
  db.any('SELECT w.word_id, w.word, w.symbol_id, s.symbol_path '
       + 'FROM words w, symbols s '
       + 'WHERE w.word=' + '\'' + targetWordName + '\' '
       + 'AND w.symbol_id=s.symbol_id')
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
          console.log("the word which word_name is " + targetWordName + " were sent.");
      } else {
        res.status(404)
        .send("ERROR: word_name " + '\'' + targetWordName + '\' ' + "not found");
        console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

// This function will insert data into the DB for creating a new button
function createWord(req, res, next) {
  var wName = req.body.name;
  var wPath = req.body.path;
  var wText = req.body.text;
  var lName = req.body.list;

 db.task( function (t) {
    return t.one('SELECT list_id from Lists WHERE list_title = $1', [lName])
        .then(function (lId) {
            return t.one('INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)'
                      + ' VALUES ($1, $2, $3) RETURNING symbol_id;', [wName, wPath, wText])
             .then( function (sId) {
                  return t.one('INSERT INTO Words (word, symbol_id)'
                            + ' VALUES ($1, $2) RETURNING word_id;', [wName, sId.symbol_id])
                        .then( function(wId) {
                          return t.none('INSERT INTO ListWords (word_id, list_id) '
                                 + 'VALUES ($1, $2);', [wId.word_id, lId.list_id]);
                        });
              });
      });
  })
    .then(function (data) {
     if (db.one('SELECT EXISTS (SELECT * FROM Words WHERE word = $1);', [wName])) {
        res.status(201).json(data);
        console.log("New word " + '\'' + wName + '\'' + " created");
      } else {
        res.status(400)
          .send("ERROR: new word not added");
      }
    })
   .catch (function (err) {
      return next(err);
   });
}

module.exports = {
    getAllWords: getAllWords,
    getWordByID: getWordByID,
    getWordByName: getWordByName,
    createWord: createWord
}
