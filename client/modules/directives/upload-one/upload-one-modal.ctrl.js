angular.module('udo.controllers')
    .controller('WindowCtrl', function ($scope) {
        $scope.place = {};
        $scope.showPlaceDetails = function(param) {
            $scope.place = param;
        }
    })
    .controller('uploadOneModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
        var ctrl = this;
        ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        ctrl.selected = {
            options: {
                visible:false

            },
            templateurl:'modules/directives/upload-one/window.tpl.html',
            templateparameter: {}
        };

        ctrl.map = {
            control: {},
            center: {
                latitude: 40.74349,
                longitude: -73.990822
            },
            zoom: 4,
            dragging: false,
            bounds: {},
            markers: [],
            idkey: 'place_id',
            events: {
                idle: function (map) {

                },
                dragend: function(map) {
                    //update the search box bounds after dragging the map
                    var bounds = map.getBounds();
                    var ne = bounds.getNorthEast();
                    var sw = bounds.getSouthWest();
                    ctrl.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
                    //$scope.searchbox.options.visible = true;
                }
            }
        };

        ctrl.options = {
            scrollwheel: true
        };
        var events = {
            places_changed: function (searchBox) {
                console.log('places_changed');
                places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }
                // For each place, get the icon, place name, and location.
                newMarkers = [];
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0, place; place = places[i]; i++) {
                    // Create a marker for each place.
                    var marker = {
                        id:i,
                        place_id: place.place_id,
                        name: place.name,
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        options: {
                            visible:false
                        },
                        templateurl:'modules/directives/upload-one/window.tpl.html',
                        templateparameter: place
                    };
                    newMarkers.push(marker);

                    bounds.extend(place.geometry.location);
                }

                ctrl.map.bounds = {
                    northeast: {
                        latitude: bounds.getNorthEast().lat(),
                        longitude: bounds.getNorthEast().lng()
                    },
                    southwest: {
                        latitude: bounds.getSouthWest().lat(),
                        longitude: bounds.getSouthWest().lng()
                    }
                };

                _.each(newMarkers, function(marker) {
                    marker.closeClick = function() {
                        ctrl.selected.options.visible = false;
                        marker.options.visble = false;
                        return $scope.$apply();
                    };
                    marker.onClicked = function() {
                        ctrl.selected.options.visible = false;
                        ctrl.selected = marker;
                        ctrl.selected.options.visible = true;
                    };
                });

                console.log(newMarkers);

                ctrl.map.center = {
                    latitude: newMarkers[0].latitude,
                    longitude: newMarkers[0].longitude
                };
                ctrl.map.zoom = 12;


                ctrl.map.markers = newMarkers;
            }
        };
        ctrl.searchbox = {
            position:'top-left',
            options: {
                bounds: {},
                visible: true
            },
            template:'modules/directives/upload-one/gmap-searchbox.tpl.html',
            events:events
        };


        ctrl.currentStep = 'provideLocation';
    }]);