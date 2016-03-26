var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('../../config/').configAuth;
var db = require('../db/');
var usersCtrl = require('../entities/users/users-ctrl');

module.exports = function(passport) {


    passport.serializeUser(function(user, done){
        console.log('-------------------serializeUser-----------------');
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        var uId = id;
        if(id.length > 10) {
            uId = 0;
        }
        console.log('-------------------deserializeUser [' + id + ']-----------------');
        usersCtrl.searchUsers('id=$1 OR facebook_id=$2 OR google_id=$3', [uId,id,id])
            .then(function (result) {
                done(null, result[0]);
            }, function (err) {
                console.log('err:::::' + err);
                done(err);
            });
    });


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            process.nextTick(function(){
                // TODO
                // User.findOne({'local.username': email}, function(err, user){
                //     if(err)
                //         return done(err);
                //     if(user){
                //         return done(null, false, req.flash('signupMessage', 'That email already taken'));
                //     } else {
                //         var newUser = new User();
                //         newUser.local.username = email;
                //         newUser.local.password = newUser.generateHash(password);
                //
                //         newUser.save(function(err){
                //             if(err)
                //                 throw err;
                //             return done(null, newUser);
                //         })
                //     }
                // })

            });
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            process.nextTick(function(){
                // TODO
                // User.findOne({ 'local.username': email}, function(err, user){
                //     if(err)
                //         return done(err);
                //     if(!user)
                //         return done(null, false, req.flash('loginMessage', 'No User found'));
                //     if(!user.validPassword(password)){
                //         return done(null, false, req.flash('loginMessage', 'invalid password'));
                //     }
                //     return done(null, user);
                //
                // });
            });
        }
    ));


    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'email', 'photos']
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                
                var nameArr = profile._json.name.split(' ');
                var fname = nameArr[0];
                var lname = nameArr[1] ? nameArr[1] : '';
                var email = profile._json.email;
                var facebook_id = profile._json.id;
                var picture = profile._json.picture && profile._json.picture.data && profile._json.picture.data.url ? profile._json.picture.data.url : '';

                var queryParams = {
                    'fname': fname,
                    'lname': lname,
                    'email': email,
                    'facebook_id': facebook_id,
                    'picture': picture,
                    'roles': JSON.stringify(['user'])
                };

                db.upsert('users', queryParams, 'email');

                done(null, profile);
            });
        }

    ));

    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){

                var fname = profile.name.givenName;
                var lname = profile.name.familyName;
                var email = profile.emails[0].value;
                var google_id = profile.id;
                var picture = profile.photos[0].value

                var queryParams = {
                    'fname': fname,
                    'lname': lname,
                    'email': email,
                    'google_id': google_id,
                    'picture': picture,
                    'roles': JSON.stringify(['user'])
                };

                db.upsert('users', queryParams, 'email');

                done(null, profile);

            });
        }

    ));





};