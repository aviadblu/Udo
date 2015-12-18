var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , FacebookStrategy = require('passport-facebook').Strategy
    , logger = require('morgan')
    , session = require('express-session')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , methodOverride = require('method-override')
    , path = require('path')
    , config = require('./config/')
    , port = process.env.PORT || config.port
    , pg = require('pg')
    , pgSession = require('connect-pg-simple')(session);

var FACEBOOK_APP_ID = "444085589117612";
var FACEBOOK_APP_SECRET = "d5b622072a8d8a38551cc3d601ab3ad7";


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    var db = require('./modules/db/');

    var nameArr = user._json.name.split(' ');
    var fname = nameArr[0];
    var lname = nameArr[1] ? nameArr[1]: '';
    var email = user._json.email;
    var facebook_id = user._json.id;
    var picture = user._json.picture && user._json.picture.data && user._json.picture.data.url ? user._json.picture.data.url : '';

    var queryParams = {
        'fname': fname,
        'lname': lname,
        'email': email,
        'facebook_id': facebook_id,
        'picture': picture,
        'roles': JSON.stringify(['user'])
    };

    db.upsert('users', queryParams, 'email');

    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('+++++++++++++++++++++++++ deserializeUser +++++++++++++++++++++++++');
    done(null, obj);
});


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:9090/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email', 'photos']
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));




var app = express();
// configure Express

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': 'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(session({
    store: new pgSession({
        pg : pg,
        conString : config.pgConnectionStr,
        tableName : 'session'
    }),
    secret: 'udo_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

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

//app.use(function (req, res, next) {
//    console.log(req.session);
//    next();
//});

// routes
require('./routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);