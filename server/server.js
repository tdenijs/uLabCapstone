const express = require('express');
const router = express.Router();
const db = require('./queries');
const app = express();
const cors = require('cors');
//const fs = require('fs');

// for handling post requests
const bodyParser = require('body-parser');

// middleware for handling file uploads
//const multer = require('multer');
//const upload = multer({ dest: 'uploads/'})
// Node middleware used to parser cookie header and populate req.cookie-parser
// with an object keyed by the cookie names
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//===============================================
// Routes
//===============================================

app.get('/', function(req, res) {
  res.send('Welcome to the API Server!')
});
router.get('/words', db.getAllWords);
router.get('/lists/title/:title', db.getAllWordsByListName);
router.get('/lists/id/:id', db.getAllWordsByListId);
router.get('/grids/title/:grid_title/words', db.getAllWordsByGridName)
router.get('/grids/id/:grid_id/words', db.getAllWordsByGridId)
router.get('/grids', db.getAllGrids)
router.get('/grids/id/:grid_id', db.getAllListsByGridID)
router.get('/grids/:grid_id/lists/:list_id', db.getAllListWordsByListId)
router.post('/words', db.createWord);

// ....add more routes here ....

//===============================================
app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log('Find the API server at: http://localhost:3001/');
});

module.exprts = router;
