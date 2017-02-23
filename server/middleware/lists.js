/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

const db = require('../config/dbconnect');

function getAllWordsByListId(req, res, next) {
  var id = req.params.id;
  db.any("select l.list_id, l.list_title, lw.word_id, w.word, w.symbol_id, s.symbol_path, s.symbol_text "
    + "from lists l inner join listwords lw on l.list_id=lw.list_id "
    + "inner join words w on lw.word_id=w.word_id "
    + "inner join symbols s on w.symbol_id=s.symbol_id "
    + "where l.list_id=" + '\'' + id + '\'')
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("All words for list id " + id + " were sent.");
      } else {
        res.status(404)
          .send("ERROR: List id " + '\'' + id + '\' ' + "not found");
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

function deleteWordByID(req, res, next) {

}


function deleteWordByName(req, res, next) {

}


module.exports = {
    getAllWordsByListId: getAllWordsByListId,
    getAllWordsByListName: getAllWordsByListName,
    deleteWordByID: deleteWordByID,
    deleteWordByName: deleteWordByName
}
