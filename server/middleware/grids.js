/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

const db = require('../config/dbconnect');

function getAllGrids(req, res, next) {
      db.any('SELECT g.grid_id, g.grid_title FROM grids g')
    .then(function (data) {
      if (data.length > 0) {
      res.status(200)
        .json(data)
        console.log("All grids were sent.")
      }
      else {
        res.status(404)
          .send("ERROR: No grid found");
          console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

// Returns all lists, words, symbols for grid by grid id
function getAllWordsByGridId(req, res, next) {
  var gridId = req.params.grid_id;
  db.any("select g.grid_id, g.grid_title, l.list_id, l.list_title, w.word_id, w.word, s.symbol_id, s.symbol_name, s.symbol_path, s.symbol_text "
    + "from grids g inner join gridlists gl on g.grid_id=gl.grid_id "
    + "inner join lists l on l.list_id=gl.list_id "
    + "inner join listwords lw on l.list_id=lw.list_id "
    + "inner join words w on w.word_id=lw.word_id "
    + "inner join symbols s on w.symbol_id=s.symbol_id "
    + "where g.grid_id="+ '\'' + gridId + '\'' + " order by w.word_id")
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("All words for grid " + gridId + " were sent.");
      } else {
        res.status(404)
          .send("ERROR: Grid " + '\'' + gridId + '\' ' + "not found");
        console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

// Returns all lists, words, symbols for grid by grid name
function getAllWordsByGridName(req, res, next) {
  var gTitle = req.params.grid_title;
  db.any("select g.grid_id, g.grid_title, l.list_id, l.list_title, w.word_id, w.word, s.symbol_id, s.symbol_name, s.symbol_path, s.symbol_text "
    + "from grids g inner join gridlists gl on g.grid_id=gl.grid_id "
    + "inner join lists l on l.list_id=gl.list_id "
    + "inner join listwords lw on l.list_id=lw.list_id "
    + "inner join words w on w.word_id=lw.word_id "
    + "inner join symbols s on w.symbol_id=s.symbol_id "
    + "where g.grid_title="+ '\'' + gTitle + '\'' + " order by w.word_id")
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("All words for grid " + gTitle + " were sent.");
      } else {
        res.status(404)
          .send("ERROR: Grid " + '\'' + gTitle + '\' ' + "not found");
        console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

// this fucntion returns an array of lists in a given grid
// in the form
//      [{"grid_id": , "list_id": , "list_title": }, ...]
function getAllListsByGridID(req, res, next) {
  var targetGridID = req.params.grid_id;
  db.any('SELECT gl.grid_id, gl.list_id, l.list_title '
         + 'FROM gridlists gl '
         + 'INNER JOIN lists l ON gl.list_id=l.list_id '
         + 'WHERE gl.grid_id=' + '\'' + targetGridID + '\' '
         + 'ORDER BY gl.list_id asc')
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
          console.log("All lists for grid_id " + targetGridID + " were sent.");
      } else {
        res.status(404)
        .send("ERROR: grid_id " + '\'' + targetGridID + '\' ' + "not found");
        console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllListWordsByListId(req, res, next) {
  var gridId = req.params.grid_id;
  var listId = req.params.list_id;
  db.any("select g.grid_id, g.grid_title, l.list_id, l.list_title, w.word_id, w.word, s.symbol_id, s.symbol_path, s.symbol_text "
         + "from grids g inner join gridlists gl on g.grid_id=gl.grid_id "
         + "inner join lists l on l.list_id = gl.list_id "
         + "inner join listwords lw on l.list_id = lw.list_id "
         + "inner join words w on w.word_id = lw.word_id "
         + "inner join symbols s on w.symbol_id = s.symbol_id "
         + "where g.grid_id= " + '\'' + gridId + '\'' + " and l.list_id = " + '\'' + listId + '\'' )
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
          console.log("All words for list " + '\'' + listId + '\'' + " were sent.");
      } else {
        res.status(404)
        .send("ERROR: List " + '\'' + listId + '\' ' + "not found");
        console.log("ERROR (404)");
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
    getAllGrids: getAllGrids,
    getAllWordsByGridId: getAllWordsByGridId,
    getAllWordsByGridName: getAllWordsByGridName,
    getAllListWordsByListId: getAllListWordsByListId,
    getAllListsByGridID: getAllListsByGridID
}
