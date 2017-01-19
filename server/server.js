const express = require('express');
const router = express.Router();
const db = require('./queries')
const app = express();
const fs = require('fs');

// Node middleware used to handle JSON, raw, text and url encoded form data
//const bodyParser = require('body-parser');
// Create a urlencoded parser for post requests
//const urlencodedParser = bodyParser.urlencoded({extended: false });

// Node middleware used to parser cookie header and populate req.cookie-parser
// with an object keyed by the cookie names
const cookieParser = require('cookie-parser');

// Node middleware used to handle multipart/form data
//const multer = require('multer');

app.use(cookieParser());

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//===============================================
// Routes
//===============================================

router.get('/api/words', db.getAllWords);

/*
app.get('/', function(req, res) {
  res.send('Welcome to the API Server!')
});
*/
app.listen(app.get('port'), function() {
  console.log('Find the API server at: http://localhost:3001/');
});

module.exprts = router;
