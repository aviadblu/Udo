var express = require('express');
var app = require('../../config').app;
var router = express.Router();
var passport = app.passport;
var usersCtrl = require('../entities/users/users-ctrl');
var User = require('../entities/users/user').User;

// facebook
router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));
// google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
    }));




router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(user);
    })(req, res, next);
});


// router.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/', // redirect to the secure profile section
//     failureRedirect : '/', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));


router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return res.status(500).send(err);
        }

        console.log(user);
        res.send(user);
    })(req, res, next);
});


// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function (req, res) {
    delete req.session.user;
    req.logout();
    res.redirect('/');
});

router.get('/identity', function (req, res) {
    if (req.user) {
        console.log(req.user);
        usersCtrl.searchUsers('email=$1', [req.user.email])
            .then(function (result) {
                var userData = result[0];
                console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                if(!userData.picture) {
                    userData.picture = '/assets/img/user.png';
                }
                req.session.user = userData;
                res.send(userData);
            }, function (err) {
                res.status(500).send(err);
            });
    }
    else {
        var user = {
            "fname": "Guest",
            "lname": "",
            "roles": ['guest']
        };
        res.send(user);
    }
});


module.exports = router;