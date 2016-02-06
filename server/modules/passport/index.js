var config = require('../../config/'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "444085589117612";
var FACEBOOK_APP_SECRET = "d5b622072a8d8a38551cc3d601ab3ad7";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
    var db = require('./modules/db/');

    var nameArr = user._json.name.split(' ');
    var fname = nameArr[0];
    var lname = nameArr[1] ? nameArr[1] : '';
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

passport.deserializeUser(function (obj, done) {
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
        callbackURL: config.FBcallbackUrl,
        profileFields: ['id', 'displayName', 'email', 'photos']
    },
    function (accessToken, refreshToken, profile, done) {
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

module.exports = passport;
