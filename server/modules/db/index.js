var config = require('../../config');
var pg = require('pg');
var connectionString = config.pgConnectionStr;
var client = new pg.Client(connectionString);
var Q = require('q');


module.exports = {
    pgClient: client,
    query: function(queryStr, paramsArr) {
        paramsArr = paramsArr !== undefined ? paramsArr : [];
        var deferred = Q.defer();
        pg.connect(connectionString, function(err, client, done) {
            if(err) {
                return deferred.reject('connection error ::: ' + err);
            }
            client.query(queryStr, paramsArr, function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if(err) {
                    return deferred.reject('error running query ::: ' + err);
                }
                var resData = result.rows.length ? result.rows : null;
                deferred.resolve(resData);
            });
        });
        return deferred.promise;
    },
    upsert: function(table, paramsObj, indexKey) {
        var deferred = Q.defer();

        var _self = this;

        var paramsArr = [];
        // build update query
        var _update = "UPDATE " + table + " SET";
        var _where = null;
        var _counter = 1;
        var _setStarted = false;
        Object.keys(paramsObj).forEach(function (key) {
            var value = paramsObj[key];
            paramsArr.push(value);

            if(key === indexKey) {
                _where = " WHERE " + indexKey + "=$" + _counter;
            }
            else {
                if(_setStarted) {
                    _update += ",";
                }
                _update += " " + key + "=$" + _counter;
                _setStarted = true;
            }
            _counter++;
        });
        _update += _where;
        _update += " RETURNING *";


        // build insert query
        var _insert = "INSERT INTO " + table + " (";
        var _counter = 1;
        var _setStarted = false;
        var _insertValues = "";
        Object.keys(paramsObj).forEach(function (key) {
            if(_setStarted) {
                _insert += ", ";
                _insertValues += ", ";
            }
            _insert += key;
            _insertValues += "$" + _counter;
            _setStarted = true;
            _counter++;
        });

        _insert += ")";
        _insert += " VALUES (" + _insertValues + ")";
        _insert += " RETURNING *";

        // build select query
        var _select = "SELECT * FROM " + table;
        var _selectParams = [paramsObj[indexKey]];
        _select += _where = " WHERE " + indexKey + "=$1";;

        _self.query(_select, _selectParams).then(function(data){
            var _query = data ? _update : _insert;
            _self.query(_query, paramsArr).then(function(data){
                deferred.resolve(data);
            }, function(err){
                deferred.reject(err);
            });
        }, function(err){
            deferred.reject(err);
        });

        return deferred.promise;

    }
};