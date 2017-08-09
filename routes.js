var express = require('express');
var route = express.Router();
var pg = require('pg');
var pool = require('./pg-connection-pool');


route.get('/events', function(req, res, next) {
  pool.query('select * from events order by id').then(function(result) {
    res.send(result.rows);
  });
});

route.get('/photos', function(req, res, next) {
  pool.query('select * from image order by id').then(function(result) {
    res.send(result.rows);
  });
});

module.exports = route;
