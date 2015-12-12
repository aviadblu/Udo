// set up ======================================================================
var express = require('express');
var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');

var config = require('./config/');
var app = express(); 								// create our app w/ express
var port = process.env.PORT || config.port;

app.db = require('./modules/db/');

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

config.app = app;

// routes
require('./routes.js')(app);


app.listen(port);
console.log("App listening on port " + port);