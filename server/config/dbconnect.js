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
