var express = require('express');
var app   = require('../../../config').app;
var Q = require('q');


module.exports = {
    addUser: function(fname, lname, email) {
        var deferred = Q.defer();
        var sql = 'INSERT INTO users (fname, lname, email) VALUES ($1, $2, $3) RETURNING id';
        var queryParams = [
            fname,
            lname,
            email
        ];
        
        app.db.query(sql, queryParams).then(function(data){
            deferred.resolve(data);
        }, function(err){
            deferred.reject(err);
        });
        
        return deferred.promise;
    },
    
    searchUsers: function(query, queryParams) {
        var deferred = Q.defer();
        var sql = 'SELECT id,fname,lname,email,picture,roles FROM users';
        
        if(query !== undefined) {
            sql += ' WHERE ' + query;
        }

        app.db.query(sql, queryParams).then(function(data){
            deferred.resolve(data);
        }, function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    },
    
    getUserTasks: function(userId) {
        var deferred = Q.defer();
        var sql = 'SELECT * FROM tasks WHERE user_id=$1';

        app.db.query(sql, [userId]).then(function(data){
            deferred.resolve(data);
        }, function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
};