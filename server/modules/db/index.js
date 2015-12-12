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
                var resData = result.rows.length ? result.rows : [];
                if(result.rows.length === 1) {
                    resData = result.rows[0];
                }
                deferred.resolve(resData);
            });
        });
        return deferred.promise;
    }
};