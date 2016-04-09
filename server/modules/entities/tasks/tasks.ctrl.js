var express = require('express');
var app   = require('../../../config').app;
var Q = require('q');


module.exports = {
    newTask: function(userId, location_name, location_latitude, location_longitude, location_fulldata, field, description, pricing_calc, pricing_method, pricing_rate) {
        var deferred = Q.defer();
        var timeNow = parseInt(new Date().getTime());
        var sql = 'INSERT INTO tasks (user_id, status, location_name, location_latitude, location_longitude, location_fulldata, field, description, pricing_calc, pricing_method, pricing_rate, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id';
        var queryParams = [
            userId,
            'open',
            location_name,
            location_latitude,
            location_longitude,
            location_fulldata,
            field,
            description,
            pricing_calc,
            pricing_method,
            pricing_rate,
            timeNow
        ];

        app.db.query(sql, queryParams).then(function(data){
            deferred.resolve(data);
        }, function(err){
            deferred.reject(err);
        });

        return deferred.promise;
    },
    getOpenTasks: function() {
        var deferred = Q.defer();
        var sql = 'SELECT ' +
            'tasks.id,' +
            'tasks.status,' +
            'tasks.location_name,' +
            'tasks.location_latitude,' +
            'tasks.location_longitude,' +
            'tasks.field,' +
            'tasks.description,' +
            'tasks.pricing_calc,' +
            'tasks.pricing_method,' +
            'tasks.pricing_rate,' +
            'tasks."time",' +
            'users.fname,' +
            'users.lname,' +
            'users.picture ' +
            'FROM ' +
            'public.tasks,' +
            'public.users ' +
            'WHERE ' +
            'tasks.user_id = users.id AND tasks.status = \'open\' ' +
            'ORDER BY ' +
            'tasks."time" DESC;';
        app.db.query(sql).then(function(data){
            if(!data) {
                data = [];
            }
            deferred.resolve(data);
        }, function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
};