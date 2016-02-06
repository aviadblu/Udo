var config = require('../../config/'),
    session = require('express-session'),
    pg = require('pg'),
    pgSession = require('connect-pg-simple')(session);


module.exports = function(app) {
    app.use(session({
        store: new pgSession({
            pg : pg,
            conString : config.pgConnectionStr,
            tableName : 'session'
        }),
        secret: 'udo_secret',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    }));
};