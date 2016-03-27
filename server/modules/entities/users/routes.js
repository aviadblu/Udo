var express = require('express');
var app = require('../../../config').app;
var usersCtrl = require('./users-ctrl');
var router = express.Router();
var User = require('./user').User;

router.post('/checkEmailFree', function (req, res) {
    User.findOne('email=$1', [req.body.email])
        .then(function (user) {
            res.send(false);
        })
        .catch(function (err) {
            res.send(true);
        });
});

router.post('/', function (req, res) {
    User.createOne(req.body.fname, req.body.lname, req.body.email, req.body.password)
        .then(function (result) {
            res.send(result);
        }, function (err) {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get('/', function (req, res) {
    usersCtrl.searchUsers()
        .then(function (result) {
            res.send(result);
        }, function (err) {
            res.status(500).send(err);
        });
});

router.get('/user-tasks', function (req, res) {
    if (!req.session.user) {
        return res.send([]);
    }
    usersCtrl.getUserTasks(req.session.user.id)
        .then(function (result) {
            res.send(result);
        }, function (err) {
            res.status(500).send(err);
        });
});


module.exports = router;