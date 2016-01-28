var express = require('express');
var app   = require('../../../config').app;
var router = express.Router();
var tasksCtrl = require('./tasks.ctrl');

router.post('/', function (req, res) {
    if(!req.session.user) {
        return res.status(401);
    }

    tasksCtrl.newTask(
        req.session.user[0].id,
        req.body.location.name,
        req.body.location.latitude,
        req.body.location.longitude,
        req.body.location.fullData,
        req.body.field,
        req.body.description,
        req.body.pricing.calc,
        req.body.pricing.method,
        req.body.pricing.rate)
        .then(function(result){
            res.send(result);
        }, function(err){
            res.status(500).send(err);
        });
});

router.get('/', function (req, res) {
    tasksCtrl.getOpenTasks()
        .then(function(result){
            res.send(result);
        }, function(err){
            res.status(500).send(err);
        });
});




module.exports = router;
