/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

const express = require('express');
const router = express.Router();
// middleware for handling file uploads

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/img/')
  },
  filename: function (req, file, cb) {

    if(!file.originalname.match(/\.(png)$/)) {
      var err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
    cb(null, file.fieldname + '.png');
    }
  }
})
var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000}
}).single('myfile');
/*
const upload = multer({
    dest: 'client/public/img/'
    //limit: 100000
 })*/
const words = require('../middleware/words');
//const mw = require('../middleware');
const lists = require('../middleware/lists');
const grids = require('../middleware/grids');
//const img = require('../middleware/img');
//===============================================
// GET Requests
//===============================================

//------------ Get data by word -----------------
router.get('/words', words.getAllWords);
router.get('/words/id/:word_id', words.getWordByID);
router.get('/words/name/:word_name', words.getWordByName);

//------------ Get data by list -----------------
router.get('/lists/id/:id', lists.getAllWordsByListId);
router.get('/lists/title/:title', lists.getAllWordsByListName);

//------------ Get data by grid -----------------
router.get('/grids', grids.getAllGrids);
router.get('/grids/id/:grid_id/words', grids.getAllWordsByGridId);
router.get('/grids/title/:grid_title/words', grids.getAllWordsByGridName);
router.get('/grids/id/:grid_id', grids.getAllListsByGridID);

//-------- Get data by grid and list -------------
router.get('/grids/:grid_id/lists/:list_id', grids.getAllListWordsByListId);

router.get('/imgupload.html', function(req, res) {
  res.sendFile(__dirname + '/imgupload.html');
});
//===============================================
// POST Requests
//===============================================

router.post('/words', words.createWord);
router.post('/imgupload'/*, upload.any()*/, function(req, res/*, next*/) {
  upload(req, res, function(err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ success: false, message: 'File size is large. Max limit is 10MB'});
      } else if (err.code === 'filetype') {
        res.status(400).json({ success: false, message: 'File type is invalid. Must be .png'});
      } else {
        console.log(err);
        res.status(400).json({ success: false, message: 'File was unable to upload'});
      }
    } else {
      if (!req.file) {
        res.status(400).json({success: false, message: 'No file'});
      } else {
          res.status(201).send(req.file);
      }
    }
  });

});
//===============================================

//===============================================
// DELETE Requests
//===============================================
router.delete('/words/list_id/:list_id/word_id/:word_id', lists.deleteWordByID);


//===============================================
module.exports = router;
