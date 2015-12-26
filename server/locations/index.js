var locationsStr = process.env.LOCATIONS || 'israel,germany';
var locations = locationsStr.split(',');
var locationsJson = {};

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

locations.forEach(function(country) {
    var countryName = country.replace('-', ' ').capitalize().replace(' ', '');
    locationsJson[countryName] = require('./countries/' + country + '.json');
});

module.exports = locationsJson;