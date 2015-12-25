var express = require('express');
var app   = require('../../../config').app;
var usersCtrl = require('./users-ctrl');
var router = express.Router();

router.post('/', function (req, res) {
    usersCtrl.addUser(req.body.fname, req.body.lname, req.body.email)
    .then(function(result){
        res.send(result);
    }, function(err){
        res.status(500).send(err);
    });
});

router.get('/', function (req, res) {
    usersCtrl.searchUsers()
    .then(function(result){
        res.send(result);
    }, function(err){
        res.status(500).send(err);
    });
});

router.get('/user-tasks', function (req, res) {
    if(!req.session.user) {
        return res.send([]);
    }
    usersCtrl.getUserTasks(req.session.user[0].id)
    .then(function(result){
        res.send(result);
    }, function(err){
        res.status(500).send(err);
    });
});


module.exports = router;