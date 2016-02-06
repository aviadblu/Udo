var express = require('express')
    , util = require('util')
    , logger = require('morgan')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , methodOverride = require('method-override')
    , path = require('path')
    , config = require('./config/')
    , port = process.env.PORT || config.port
      passport = require('./modules/passport');

var app = express();
// configure Express

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': 'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

// session management:
require('./modules/session')(app);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '../client')));

// configure app globals
app.db = require('./modules/db/');
app.passport = passport;
// save app into config singleton
config.app = app;

// routes
require('./routes.js')(app);

app.listen(port);
console.log("App listening on port " + port + " env mode: " + config.env);