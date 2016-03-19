var express = require('express');
var app = require('../../config').app;
var router = express.Router();
var passport = app.passport;
var usersCtrl = require('../entities/users/users-ctrl');

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
                req.session.user = result;
                res.send(result);
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
        res.send([user]);
    }
});


module.exports = router;