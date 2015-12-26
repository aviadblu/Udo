var express = require('express');
var app   = require('../../../config').app;
var locations = require('../../../locations');
var router = express.Router();


router.get('/', function (req, res) {
    res.send(locations);
});


module.exports = router;