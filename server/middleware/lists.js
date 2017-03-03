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
//    GET /lists/id/:id
// It retuurns all words in the specific list in the form
//    [{'list_id': , 'list_title': ,
//      'word_id': , 'word': , 'symbol_id': ,
//      'symbol_path': , 'symbol_text': }, ]
// if success, it will return 200
// If fail, it will retuurn a 404 error
function getAllWordsByListId(req, res, next) {
  var id = req.params.id;
  db.any("select l.list_id, l.list_title, lw.word_id, w.word, w.symbol_id, s.symbol_path, s.symbol_text " +
      "from lists l inner join listwords lw on l.list_id=lw.list_id " +
      "inner join words w on lw.word_id=w.word_id " +
      "inner join symbols s on w.symbol_id=s.symbol_id " +
      "where l.list_id=" + '\'' + id + '\'')
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllWordsByListId) SUCCESS: All words for list id " +
          id + " were sent.");
      } else {
        res.status(404)
          .send("ERROR: List id " + '\'' + id + '\' ' + "not found");
        console.log("*** (getAllWordsByListId) ERROR 404");
      }
    })
    .catch(function(err) {
      return next(err);
    });
}


// This is the implementation for api
//    GET /lists/title/:title
// It retuurns all words in the specific list in the form
//    [{'list_id': , 'list_title': ,
//      'word_id': , 'word': , 'symbol_id': ,
//      'symbol_path': , 'symbol_text': }, ]
// if success, it will return 200
// If fail, it will retuurn a 404 error
function getAllWordsByListName(req, res, next) {
  var lTitle = req.params.title;
  db.any("select l.list_id, l.list_title, lw.word_id, w.word, w.symbol_id, s.symbol_path, s.symbol_text " +
      "from lists l inner join listwords lw on l.list_id=lw.list_id " +
      "inner join words w on lw.word_id=w.word_id " +
      "inner join symbols s on w.symbol_id=s.symbol_id " +
      "where l.list_title=" + '\'' + lTitle + '\'')
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllWordsByListName) SUCCESS: All words for list " +
          lTitle + " were sent.");
      } else {
        res.status(404)
          .send("ERROR: List " + '\'' + lTitle + '\' ' + "not found");
        console.log("*** (getAllWordsByListName) ERROR 404");
      }
    })
    .catch(function(err) {
      return next(err);
    });
}



// This is the implementation for api
//    DELETE /words/list_id/:list_id/word_id/:word_id
// It will delete the given word from the given list
// If success, it will return 200
// If fail, it will return a  404 error
function deleteWordByID(req, res, next) {
  var targetListID = parseInt(req.params.list_id);
  var targetWordID = parseInt(req.params.word_id);
  var query = 'select * from listwords where list_id=' + targetListID +
    ' and word_id=' + targetWordID;
  db.any(query)
    .then(function(data) {
      if (data.length === 1) {
        db.result('delete from listwords where list_id=$1 AND word_id=$2', [targetListID, targetWordID])
          .then(function(result) {
            if (result.rowCount === 1) {
              console.log("(deleteWordByID) SUCCESS: word is removed from list");
              res.status(200).json({
                status: 'success',
                message: `Removed ${result.rowCount} word`
              });
            } else {
              console.log("*** (deleteWordByID) FAILURE: delete failes");
            }
          });
      } else {
        res.status(404).send("ERROR: No word found.");
        console.log("*** (deleteWordByID) ERROR: No word found");
      }
    })
    .catch(function(err) {
      return next(err);
    });
}



// This is the implementation for api
//    POST /lists
// It will create a new list in the database using the given data,
// and double-check after inserting
// If success, it will return 201
// If fail, it will retuurn a 400 error
function createList(req, res, next) {
  var newListTitle = req.body.title;

  db.one('INSERT INTO Lists (list_title)' +
      ' VALUES ($1) RETURNING list_id;', [newListTitle])
    .then(function(data) {
      if (db.one('SELECT EXISTS (SELECT * FROM Lists WHERE list_title = $1 AND list_id = $2);', [newListTitle, data.list_id])) {
        res.status(201)
          .json({
            status: 'success',
            message: 'New list ' + '\'' + newListTitle + '\'' + ' created',
            data: {
              id: data.list_id
            }
          });
        console.log('(createList) SUCCESS: New list ' + '\'' + newListTitle + '\'' +
          ' created with id: ' + data.list_id);
      } else {
        res.status(400)
          .json({
            status: 'failed',
            message: 'Unable to create new list ' + '\'' + newListTitle + '\''
          });
      }
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllWordsByListId: getAllWordsByListId,
  getAllWordsByListName: getAllWordsByListName,
  deleteWordByID: deleteWordByID,
  createList: createList
};
