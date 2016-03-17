angular.module('udo.factories')
    .factory('GoogleMapFactory', function () {

    return function GoogleMapFactory() {

        var mapOptions = {
            control: {},
            center: {
                lat: 40.74349,
                lng: -73.990822
            },
            zoom: 4,
            dragging: true,
            bounds: {},
            markers: [],
            idkey: 'place_id',
            //events: {
            //    idle: function (map) {
            //
            //    },
            //    dragend: function (map) {
            //        //update the search box bounds after dragging the map
            //        var bounds = map.getBounds();
            //        var ne = bounds.getNorthEast();
            //        var sw = bounds.getSouthWest();
            //        ctrl.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
            //        //$scope.searchbox.options.visible = true;
            //    }
            //}
        };

        var map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);

        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }



    };
});