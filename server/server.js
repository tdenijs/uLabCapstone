const express = require('express');
const routes = require('./routes');
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
app.use('/api', routes);
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Serve up client in production
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

app.listen(port, function() {
  console.log('The API server is running at localhost:' + port);
});
//module.exprts = router;
