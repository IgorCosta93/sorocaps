require('./api/data/db.js');
var express = require('express');
var compression = require('compression');
var app = express();
var minify = require('html-minifier').minify;
app.use(compression());

var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port', (process.env.PORT || 3000));

//var result = minify(express.static(__dirname + '/public'), {
  //removeAttributeQuotes: true
//});

app.use(express.static(__dirname + '/public'));
//app.use(result);
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');


// Add some routing
app.use('/api', routes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
