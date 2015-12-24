var express = require('express');
var app   = require('../../../config').app;
var router = express.Router();

router.post('/', function (req, res) {
    // var sql = 'INSERT INTO tasks (fname, lname, email) VALUES ($1, $2, $3) RETURNING id';
    // var queryParams = [
    //     req.body.fname,
    //     req.body.lname,
    //     req.body.email
    // ];

    // app.db.query(sql, queryParams).then(function(data){
    //     res.send(data);
    // }, function(err){
    //     res.status(500).send(err);
    // });

    console.log(req.body);
    res.send('ok');
});

router.get('/', function (req, res) {
    var sql = 'SELECT * FROM tasks';

    app.db.query(sql).then(function(data){
        res.send(data);
    }, function(err){
        res.status(500).send(err);
    });
});




module.exports = router;