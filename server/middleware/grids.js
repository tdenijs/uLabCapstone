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
//    GET /grids
// It will return all grids in the database in the form
//    [{'grid_id': , 'grid_title': }, ]
// If success, it will return 200
// If fail, it will retuurn a 400 error
function getAllGrids(req, res, next) {
  db.any('SELECT g.grid_id, g.grid_title FROM grids g')
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllGrids) SUCCESS: All grids were sent.");
      } else {
        res.status(404)
          .json({
            success: false,
            message: 'No grids found'
          });
        console.log('(getAllGrids) ERROR: No grids found');
      }
    })
    .catch(function(err) {
      return next(err);
    });
}

// This is the implementation for api
//    GET /grids/id/:grid_id/words
// It will return all words in a specific grid in the form
//    [{'grid_id': , 'grid_title': ,
//      'list_id': , 'list_title': ,
//      'word_id': , 'word': ,
//      'symbol_id': , 'symbol_name': ,
//      'symbol_path', 'symbol_text' }]
// If success, it will return 200
// If fail, it will retuurn a 400 error
function getAllWordsByGridId(req, res, next) {
  var gridId = req.params.grid_id;
  db.any("SELECT g.grid_id, g.grid_title, l.list_id, l.list_title, " +
                "w.word_id, w.word, s.symbol_id, s.symbol_name, s.symbol_path, s.symbol_text " +
         "FROM grids g " +
         "INNER JOIN gridlists gl ON g.grid_id=gl.grid_id " +
         "INNER JOIN lists l ON l.list_id=gl.list_id " +
         "INNER JOIN listwords lw ON l.list_id=lw.list_id " +
         "INNER JOIN words w ON w.word_id=lw.word_id " +
         "INNER JOIN symbols s ON w.symbol_id=s.symbol_id " +
         "WHERE g.grid_id=$1 ORDER BY w.word_id", [gridId])
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllWordsByGridId) SUCCESS: All words for grid " +
          gridId + " were sent.");
      } else {
        res.status(404)
          .json({
            success: false,
            message: 'Grid id ' + '\'' + gridId + '\'' + ' not found'
          });
        console.log('*** (getAllWordsByGridId) ERROR: Grid id' + '\'' + gridId + '\'' + ' not found');
      }
    })
    .catch(function(err) {
      return next(err);
    });
}


// This is the implementation for api
//    GET /grids/title/:grid_title/words
// It will return all words in a specific grid in the form
//    [{'grid_id': , 'grid_title': ,
//      'list_id': , 'list_title': ,
//      'word_id': , 'word': ,
//      'symbol_id': , 'symbol_name': ,
//      'symbol_path', 'symbol_text' }]
// If success, it will return 200
// If fail, it will retuurn a 400 error
function getAllWordsByGridName(req, res, next) {
  var gTitle = req.params.grid_title;
  db.any("SELECT g.grid_id, g.grid_title, l.list_id, l.list_title, " +
                "w.word_id, w.word, s.symbol_id, s.symbol_name, s.symbol_path, s.symbol_text " +
         "FROM grids g " +
         "INNER JOIN gridlists gl ON g.grid_id=gl.grid_id " +
         "INNER JOIN lists l ON l.list_id=gl.list_id " +
         "INNER JOIN listwords lw ON l.list_id=lw.list_id " +
         "INNER JOIN words w ON w.word_id=lw.word_id " +
         "INNER JOIN symbols s ON w.symbol_id=s.symbol_id " +
         "WHERE g.grid_title=$1 ORDER BY w.word_id", [gTitle])
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllWordsByGridName) SUCCESS: All words for grid " +
          gTitle + " were sent.");
      } else {
        res.status(404)
          .json({
            success: false,
            message: 'Grid ' + '\'' + gTitle + '\'' + ' not found'
          });
        console.log('*** (getAllWordsByGridName) ERROR: Grid ' + '\'' + gTitle + '\'' + ' not found');
      }
    })
    .catch(function(err) {
      return next(err);
    });
}


// This is the implementation for api
//    GET /grids/id/:grid_id
// It will return all lists in a specific grid in the form
//      [{"grid_id": , "list_id": , "list_title": }, ...]
// If success, it will return 200
// If fail, it will retuurn a 400 error
function getAllListsByGridID(req, res, next) {
  var targetGridID = req.params.grid_id;
  db.any('SELECT gl.grid_id, gl.list_id, l.list_title ' +
         'FROM gridlists gl ' +
         'INNER JOIN lists l ON gl.list_id=l.list_id ' +
         'WHERE gl.grid_id=$1' +
         'ORDER BY gl.list_id asc', [targetGridID])
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllListsByGridID) SUCCESS: All lists for grid_id " +
          targetGridID + " were sent.");
      } else {
        res.status(404)
          .json({
            success: false,
            message: 'Grid id ' + '\'' + gridId + '\'' + ' not found'
          });
        console.log('*** (getAllListsByGridID) ERROR: Grid id' + '\'' + gridId + '\'' + ' not found');
      }
    })
    .catch(function(err) {
      return next(err);
    });
}


// This is the implementation for api
//    GET /grids/:grid_id/lists/:list_id
// It will return all info about words in a specific lists in a specific grid
//  in the form
//    [{'grid_id': , 'grid_title': ,
//      'list_id': , 'list_title': ,
//      'word_id': , 'word': ,
//      'symbol_id': , 'symbol_path', 'symbol_text' }]
// If success, it will return 200
// If fail, it will retuurn a 400 error
function getAllListWordsByListId(req, res, next) {
  var gridId = req.params.grid_id;
  var listId = req.params.list_id;
  db.any("SELECT g.grid_id, g.grid_title, l.list_id, l.list_title, " +
                "w.word_id, w.word, s.symbol_id, s.symbol_path, s.symbol_text " +
         "FROM grids g inner join gridlists gl on g.grid_id=gl.grid_id " +
         "INNER JOIN lists l ON l.list_id = gl.list_id " +
         "INNER JOIN listwords lw ON l.list_id = lw.list_id " +
         "INNER JOIN words w ON w.word_id = lw.word_id " +
         "INNER JOIN symbols s ON w.symbol_id = s.symbol_id " +
         "WHERE g.grid_id=$1 AND l.list_id =$2", [gridId, listId])
    .then(function(data) {
      if (data.length > 0) {
        res.status(200)
          .json(data);
        console.log("(getAllWordsByListId) SUCCESS: All words for list " +
          '\'' + listId + '\'' + " were sent.");
      } else {
        res.status(404)
          .json({
            success: false,
            message: 'List id ' + '\'' + listId + '\'' + ' not found'
          });
        console.log('*** (getAllWordsByListId) ERROR: List id' + '\'' + listId + '\'' + ' not found');
      }
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllGrids: getAllGrids,
  getAllWordsByGridId: getAllWordsByGridId,
  getAllWordsByGridName: getAllWordsByGridName,
  getAllListWordsByListId: getAllListWordsByListId,
  getAllListsByGridID: getAllListsByGridID
};
