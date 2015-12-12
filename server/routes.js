var path = require('path');
module.exports = function(app) {

    app.use('/api/users', require('./modules/entities/users/routes'));

    app.get('/*', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../client/index.html'));
    });
};