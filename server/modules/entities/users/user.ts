declare var require:any;

var app = require('../../../config').app;
var bcrypt = require('bcrypt');
var Q = require('q');
import {Email} from "../../email/email";

export class User {
    private _data:any;

    get data():any {
        return this._data;
    }

    constructor(data:any) {
        this._data = data;
    }

    public static findOne(query, queryParams) {
        var deferred = Q.defer();
        var sql = 'SELECT id,fname,lname,email,picture,roles FROM users';
        if (query !== undefined) {
            sql += ' WHERE ' + query;
        }
        app.db.query(sql, queryParams).then(function (userData) {
            if (userData) {
                deferred.resolve(new User(userData[0]));
            } else {
                deferred.reject('No user');
            }

        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    public static createOne(fname, lname, email, password) {
        var deferred = Q.defer();
        // check if email exists
        User.findOne('email=$1', [email])
            .then(function (user) {
                deferred.reject('Email address already exists!');
            })
            .catch(function (err) {
                // create user
                var sql = 'INSERT INTO users (fname, lname, email, password, roles) VALUES ($1, $2, $3, $4, $5) RETURNING id';
                var queryParams = [
                    fname,
                    lname,
                    email,
                    User.generateHash(password),
                    JSON.stringify(['user'])
                ];

                app.db.query(sql, queryParams).then(function (data) {
                    var newUserId = data[0].id;
                    // send emails
                    Email.emailConfirmation(newUserId);
                    Email.newUserWelcome(newUserId);

                    User.findOne('id=$1', [newUserId])
                        .then(function (user) {
                            deferred.resolve(user);
                        })

                }, function (err) {
                    console.error(err);
                    deferred.reject(err);
                });
                ///////////////
            });
        ////////////////////////
        return deferred.promise;
    }

    public static auth(email, password) {
        var deferred = Q.defer();
        var sql = 'SELECT id,fname,lname,email,password,picture,roles FROM users WHERE email=$1';
        app.db.query(sql, [email]).then(function (userData) {
            if (userData) {
                if(userData[0].password) {
                    var dbPass = userData[0].password;
                    var checkPass = bcrypt.compareSync(password, dbPass);
                    if(checkPass) {
                        delete userData[0].password;
                        deferred.resolve(new User(userData[0]));
                    } else {
                        console.warn('Password not match');
                        deferred.reject('User Email or password incorrect');
                    }
                } else {
                    console.warn('No password for this user');
                    deferred.reject('User Email or password incorrect');
                }
            } else {
                console.warn('No user');
                deferred.reject('User Email or password incorrect');
            }

        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    public static generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    }


}