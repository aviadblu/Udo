var express = require('express');
var app   = require('../../../config').app;
var router = express.Router();

router.post('/', function (req, res) {
    if(!req.session.user) {
        return res.status(401);
    }

    var timeNow = parseInt(new Date().getTime());
    var sql = 'INSERT INTO tasks (user_id, status, location_name, location_latitude, location_longitude, field, description, pricing_calc, pricing_method, pricing_rate, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id';
    var queryParams = [
        req.session.user[0].id,
        'open',
        req.body.location.name,
        req.body.location.latitude,
        req.body.location.longitude,
        req.body.field,
        req.body.description,
        req.body.pricing.calc,
        req.body.pricing.method,
        req.body.pricing.rate,
        timeNow
    ];

    app.db.query(sql, queryParams).then(function(data){
        res.send(data);
    }, function(err){
        res.status(500).send({
            err: err,
            data: req.body,
            query: queryParams
        });
    });
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