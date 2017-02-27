/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

//============================================
// Setup DB connection
//============================================

const promise = require('bluebird');
const options = { promiseLib: promise};
const pgp = require('pg-promise')(options);
const dbc = require('./.dbconfig');
const connectionString = 'postgres://' + dbc.user + ':' + dbc.password + '@' + dbc.hostname + ':' + dbc.port +'/' + dbc.dbname;
const db = pgp(connectionString);

module.exports = db;
