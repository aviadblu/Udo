'use strict';
angular.module('udo.services')
    .service('LocationsService', ['$http', function ($http) {

        var _self = this;
        var allowedCountries = {};
        function init() {
            $http.get('/api/locations')
                .then(function(result){
                    allowedCountries = result.data;
                });
        }
        init();

        this.analyzeAddress = function(gmapSearchBoxObject) {
            if (!gmapSearchBoxObject.address_components) {
                console.log('cant analyze address');
                return false;
            }

            try {
                var formatAddressArr = gmapSearchBoxObject.formatted_address.split(',');
                var country = formatAddressArr[formatAddressArr.length - 1].replace(' ', '');

                if (allowedCountries[country]) {

                    if (!allowedCountries[country].allowAll) {

                        var cities = allowedCountries[country].allowedCities;
                        for (var i = 0; i < gmapSearchBoxObject.address_components.length; i++) {
                            if (cities.indexOf(gmapSearchBoxObject.address_components[i].long_name) > -1) {
                                return true;
                            }
                        }
                        console.log('city blocked');
                        return false;

                    }
                    else {
                        return true;
                    }
                }
                else {
                    console.log('country blocked');
                    return false;
                }
            }
            catch (err) {
                console.log(err);
                return false;
            }
        };

        this.formatAddress = function(gmapSearchBoxObject) {
            return {
                name: gmapSearchBoxObject.formatted_address,
                latitude: gmapSearchBoxObject.geometry.location.lat(),
                longitude: gmapSearchBoxObject.geometry.location.lng(),
                fullData: gmapSearchBoxObject
            };
        };
    
    }]);