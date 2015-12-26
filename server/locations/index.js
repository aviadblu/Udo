var locationsStr = process.env.LOCATIONS || 'Israel,Germany';
var locations = locationsStr.split(',');
var locationsJson = {};

locations.forEach(function(country) {
    locationsJson[country] = require('./countries/' + country + '.json');
});

module.exports = locationsJson;