var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var port = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: true }));
app.use('/api', routes);
app.use(express.static(__dirname + '/public'));



app.listen(port, function() {
  console.log('Server is running :]');
});
