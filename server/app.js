// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 9090;


app.use(express.static(__dirname + '/client'));

// routes
require('./routes.js')(app);


app.listen(port);
console.log("App listening on port " + port);