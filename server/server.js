const express = require('express');
const router = express.Router();
const db = require('./queries')
const app = express();
//const fs = require('fs');

//==========================================================
//We will need this to handle POST requests if we get there
//==========================================================
//const bodyParser = require('body-parser');
//const urlencodedParser = bodyParser.urlencoded({extended: false });

// Node middleware used to handle multipart/form data
//const multer = require('multer');

// Node middleware used to parser cookie header and populate req.cookie-parser
// with an object keyed by the cookie names
const cookieParser = require('cookie-parser');

app.use(cookieParser());

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

// ....add more routes here ....

//===============================================

app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log('Find the API server at: http://localhost:3001/');
});

module.exprts = router;
