/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *                 Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 *
 *******************************************************************/

const express = require('express');
const router = express.Router();
const words = require('../middleware/words');
//const mw = require('../middleware');
const lists = require('../middleware/lists');
const grids = require('../middleware/grids');
const image = require('../middleware/upload');
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

//===============================================
// POST Requests
//===============================================

router.post('/words', words.createWord);
router.post('/imgupload', image.createImage);
//===============================================

//===============================================
// DELETE Requests
//===============================================
router.delete('/words/list_id/:list_id/word_id/:word_id', lists.deleteWordByID);


//===============================================
module.exports = router;
