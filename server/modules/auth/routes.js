var express = require('express');
var app   = require('../../config').app;
var router = express.Router();
var passport = app.passport;
var usersCtrl = require('../entities/users/users-ctrl');

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'] }),
    function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
    });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// AQBC5bGFpMnwdrsAHkTgwGOYnbyb1gImPXLuofIQfoqyQ26AzwiqhKyCHIssrZQKePTtNiBeME9LDggcDX23g4dKS1nk8W2oYzWqU62RDnv49aRNCUyk-swIzKXHlV3PGBwcx7pvNtXsbXOf5bkVM2612rhiuYD9CaVCnBOvFwmwc0mEeO2H_qTPX5M4LiVj2zMehB3cYYTG6s_DiTyLJJ_0deIK8pSUGYk_0BGbzSKBYH3ksjpRSlBgcmlVnxeMg6wyQ4fxlA7AMVBOozBquJTNQ-WTArUyEz1PxIIu5nv3pu-xepNYzG8mykglbE6PYY1JAJi0HpSpxrm-n41plDrT#_=_
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        console.log('======================= authenticate passed ==============================');
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/identity', function(req, res){
    if(req.user) {
        usersCtrl.searchUsers('email=$1', [req.user._json.email])
        .then(function(result){
            req.session.user = result;
            res.send(result);
        }, function(err){
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