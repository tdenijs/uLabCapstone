/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
 *******************************************************************/

const db = require('../config/dbconnect');


// This is the implementation for api
//    GET /words
// It retuurns all words in the current database in the form
//    [{'word_id': , 'word': , 'symbol_path': , 'symbol_text': }, ]
// If fail, it will retuurn a 404 error
function getAllWords(req, res, next) {
  db.any('select w.word_id, w.word, s.symbol_path, s.symbol_text ' +
      'from words w inner join symbols s on w.symbol_id = s.symbol_id')
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllWords) SUCESS: All words were sent.");
      } else {
        res.status(404)
          .send("ERROR: No words found");
        console.log("*** (getAllWords) ERROR 404: No words found, is the dababase setup correctly?");
      }
    })
    .catch(function(err) {
      return next(err);
    });
}


// This is the implementation for api
//    GET /words/id/:word_id
// It returns a word which word_id is specific in the form
//    ["word_id": , "word": , "symbol_id": , "symbol_path": ]
// If fail, it will retuurn a 404 error
function getWordByID(req, res, next) {
  var targetWordID = req.params.word_id;
  db.any('SELECT w.word_id, w.word, w.symbol_id, s.symbol_path ' +
      'FROM words w, symbols s ' +
      'WHERE w.word_id=' + '\'' + targetWordID + '\' ' +
      'AND w.symbol_id=s.symbol_id')
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getWordByID) SUCCESS: the word (word_id:" + targetWordID + ") were sent.");
      } else {
        res.status(404)
          .send("ERROR: word_id: " + '\'' + targetWordID + '\' ' + "not found");
        console.log("*** (getWordByID) ERROR 404: No word found");
      }
    })
    .catch(function(err) {
      return next(err);
    });
}


// This is the implementation for api
//    GET /words/name/:word_name
// It fucntion returns a word which word_name is specific in the form
//      ["word_id": , "word": , "symbol_id": , "symbol_path": ]
// If fail, it will retuurn a 404 error
function getWordByName(req, res, next) {
  var targetWordName = req.params.word_name;
  db.any('SELECT w.word_id, w.word, w.symbol_id, s.symbol_path ' +
      'FROM words w, symbols s ' +
      'WHERE w.word=' + '\'' + targetWordName + '\' ' +
      'AND w.symbol_id=s.symbol_id')
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getWordByName) SUCCESS: The word which word_name is " +
          targetWordName + " were sent.");
      } else {
        res.status(404)
          .json({
            success: false,
            message: 'Word ' + '\'' + wName + '\'' + 'not found'
          });
        console.log("*** (getWordByName) ERROR 404: No word found");
      }
    })
    .catch(function(err) {
      return next(err);
    });
}

// This is the implementation for api
//    POST /words
// This function will insert data into the DB for creating a new button
// An example of the data
//    {
//      "name": "love",
//      "path": "img/love.png",
//      "text": "love symbol",
//      "list": "verb"
//    }
// if fail, it will return error 400
function createWord(req, res, next) {
  var wName = req.body.name;
  var wPath = req.body.path;
  var wText = req.body.text;
  var lName = req.body.list;
  var gName = req.body.grid;
  var newWordId;
  // queries DB for the list_id based on the req.body.grid and req.body.list
  var query = 'SELECT l.list_id FROM grids g ' +
    'INNER JOIN gridlists gl ON g.grid_id=gl.grid_id ' +
    'INNER JOIN lists l ON gl.list_id=l.list_id ' +
    'WHERE list_title=' + '\'' + lName + '\'' +
    ' AND grid_title=' + '\'' + gName + '\';';
  db.task(function(t) {
      return t.one(query)
        .then(function(lId) {
          return t.one('INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)' +
              ' VALUES ($1, $2, $3) RETURNING symbol_id;', [wName, wPath, wText])
            .then(function(sId) {
              return t.one('INSERT INTO Words (word, symbol_id)' +
                  ' VALUES ($1, $2) RETURNING word_id;', [wName, sId.symbol_id])
                .then(function(wId) {
                  newWordId = wId;
                  return t.none('INSERT INTO ListWords (word_id, list_id) ' +
                    'VALUES ($1, $2);', [wId.word_id, lId.list_id]);
                });
            });
        });
    })
    .then(function(data) {
      if (db.one('SELECT EXISTS (SELECT * FROM Words WHERE word = $1);', [wName])) {
        res.status(201)
          .json({
            success: true,
            message: 'New word ' + '\'' + wName + '\'' + ' created',
            data: {
              id: newWordId.word_id
            }
        });
        console.log("(createWord) SUCESS: new word " +
          '\'' + wName + '\'' + " created");
      } else {
        res.status(400)
          .json({
            success: false,
            message: 'Failed to create new word ' + '\'' + wName + '\''
          });
        console.log("*** (createWord) ERROR: new word NOT added");
      }
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllWords: getAllWords,
  getWordByID: getWordByID,
  getWordByName: getWordByName,
  createWord: createWord
};
