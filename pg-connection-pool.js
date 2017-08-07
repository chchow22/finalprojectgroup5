var pg = require('pg');
var url = require('url');

var config = {
  user: 'postgres',
  password: '3819644288',
  host: 'localhost',
  port: 5432,
  database: 'lunch'
};

module.exports = new pg.Pool(config);
