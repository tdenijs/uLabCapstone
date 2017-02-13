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


// Returns all lists, words, symbols for grid by grid name
function getAllWordsByGridName (req, res, next) {
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

// Returns all lists, words, symbols for grid by grid id
function getAllWordsByGridId (req, res, next) {
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

// this fucntion returns an array of grids in current DB
// in the form
//      [{"grid_id": ,"grid_title": }, ...]
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

// This function will insert data into the DB for creating a new button
function createWord(req, res, next) {
  var wName = req.body.name;
  var wSymbol = req.file;
  var wText = req.body.text;
  var lName = req.body.list;
  .db.one();

}

module.exports = {
    getAllWords: getAllWords,
    getAllWordsByListName: getAllWordsByListName,
    getAllWordsByListId: getAllWordsByListId,
    getAllWordsByGridName: getAllWordsByGridName,
    getAllWordsByGridId: getAllWordsByGridId,
    getAllGrids: getAllGrids,
    getAllListsByGridID: getAllListsByGridID,
    getAllListWordsByListId: getAllListWordsByListId,
    createWord: createWord
}
