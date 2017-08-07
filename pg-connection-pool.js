var pg = require('pg');
var url = require('url');

var config = {

};

module.exports = new pg.Pool(config);
