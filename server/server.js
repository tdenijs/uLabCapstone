/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

const express = require('express');
const routes = require('./routes');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3001;

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
