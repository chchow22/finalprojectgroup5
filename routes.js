var express = require('express');
var route = express.Router();
var pg = require('pg');
var pool = require('./pg-connection-pool');


// route.get('/restaurants', function(req, res, next) {
//   pool.query('select * from hotspots order by id').then(function(result) {
//     res.send(result.rows);
//   });
// });
//
// route.post('/restaurants', function(req, res, next) {
//   var data = req.body;
//     pool.query('insert into hotspots(location, restaurant, foodtype, rating, price) values($1::text, $2::text, $3::text, $4::int, $5::int)', [data.location, data.restaurant, data.foodtype, data.rating, data.price]).then(function() {
//     pool.query('select * from hotspots order by id').then(function(result) {
//       res.send(result.rows);
//     });
//   });
// });
//
// route.delete('/restaurants/:id', function(req, res, next) {
//   var id = req.params.id;
//   pool.query('delete from hotspots where id=$1::int', [id]).then(function() {
//     pool.query('select * from hotspots order by id').then(function(result) {
//       res.send(result.rows);
//     });
//   });
// });
//
// route.put('/restaurants/:id', function(req, res, next) {
//   var data = req.body;
//   var id = req.params.id;
//   pool.query('update hotspots set location=$2::text, restaurant=$3::text, foodtype=$4::text, rating=$5::int, price=$6::int where id=$1::int ', [id, data.location, data.restaurant, data.foodtype, data.rating, data.price]).then(function() {
//     pool.query('select * from hotspots order by id').then(function(result) {
//       res.send(result.rows);
//     });
//   });
// });

module.exports = route;
