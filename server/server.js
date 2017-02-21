const express = require('express');
const router = express.Router();
const db = require('./queries');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3001;
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

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}
else {
  app.get('/', function(req, res) {
    res.send('Welcome to the API Server!')
  });
}

//===============================================
// Routes
//===============================================

router.get('/grids', db.getAllGrids)
router.get('/grids/title/:grid_title/words', db.getAllWordsByGridName)
router.get('/grids/id/:grid_id/words', db.getAllWordsByGridId)
router.get('/grids/id/:grid_id', db.getAllListsByGridID)
router.get('/grids/:grid_id/lists/:list_id', db.getAllListWordsByListId)
router.get('/lists/title/:title', db.getAllWordsByListName);
router.get('/lists/id/:id', db.getAllWordsByListId);
router.get('/words', db.getAllWords);
router.post('/words', db.createWord);
router.get('/words/id/:word_id', db.getWordByID)
router.get('/words/name/:word_name', db.getWordByName)

//===============================================

app.use('/api', router);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.listen(port, function() {
  console.log('The API server is running at localhost:' + port);
});
module.exprts = router;
