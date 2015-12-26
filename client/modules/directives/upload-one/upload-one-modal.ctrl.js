angular.module('udo.controllers')
    .controller('WindowCtrl', function ($scope) {
        $scope.place = {};
        $scope.showPlaceDetails = function (param) {
            $scope.place = param;
        }
    })
    .controller('uploadOneModalCtrl', ['$scope', '$uibModalInstance', 'TasksService', 'LocationsService', function ($scope, $uibModalInstance, TasksService, LocationsService) {
        var ctrl = this;
        ctrl.loading = false;
        ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        var _taskData = {};
        ctrl.form = {
            field: undefined,
            description: '',
            pricing: {
                calc: 'hour',
                rate: undefined,
                method: 'paypal'
            }
        };

        ctrl.selected = {
            options: {
                visible: false

            },
            templateurl: 'modules/directives/upload-one/window.tpl.html',
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
                dragend: function (map) {
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


        function formatAddress(gmapSearchBoxObject) {
            return {
                name: gmapSearchBoxObject.formatted_address,
                latitude: gmapSearchBoxObject.geometry.location.lat(),
                longitude: gmapSearchBoxObject.geometry.location.lng(),
                fullData: gmapSearchBoxObject
            };
        }

        var newMarkers = [];
        ctrl.addressCheck = null;
        var formattedAddress = null;
        var events = {
            places_changed: function (searchBox) {

                gmapSearchBoxObjectsArr = searchBox.getPlaces();

                if (gmapSearchBoxObjectsArr.length == 0) {
                    newMarkers = [];
                    return;
                }

                ctrl.addressCheck = LocationsService.analyzeAddress(gmapSearchBoxObjectsArr[0]);
                if(ctrl.addressCheck) {
                    ctrl.errors = [];
                    formattedAddress = formatAddress(gmapSearchBoxObjectsArr[0]);
                }
                else {
                    ctrl.errors = ['Invalid address'];
                    formattedAddress = null;
                }

                // For each place, get the icon, place name, and location.
                newMarkers = [];
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0, place; place = gmapSearchBoxObjectsArr[i]; i++) {
                    // Create a marker for each place.
                    var marker = {
                        id: i,
                        place_id: place.place_id,
                        name: place.name,
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        options: {
                            visible: false
                        },
                        templateurl: 'modules/directives/upload-one/window.tpl.html',
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

                _.each(newMarkers, function (marker) {
                    marker.closeClick = function () {
                        ctrl.selected.options.visible = false;
                        marker.options.visble = false;
                        return $scope.$apply();
                    };
                    marker.onClicked = function () {
                        ctrl.selected.options.visible = false;
                        ctrl.selected = marker;
                        ctrl.selected.options.visible = true;
                    };
                });

                ctrl.map.center = {
                    latitude: newMarkers[0].latitude,
                    longitude: newMarkers[0].longitude
                };
                ctrl.map.zoom = 16;


                ctrl.map.markers = newMarkers;
            }
        };
        ctrl.searchbox = {
            position: 'top-left',
            options: {
                bounds: {},
                visible: true
            },
            template: 'modules/directives/upload-one/gmap-searchbox.tpl.html',
            events: events
        };


        ctrl.currentStep = 'provideLocation';

        ctrl.saveLocation = function () {
            ctrl.errors = [];
            if (!ctrl.addressCheck) {
                ctrl.errors.push('Invalid address');
            }
            else {
                _taskData.location = formattedAddress;
                ctrl.currentStep = 'provideGeneralData';
            }
        };

        ctrl.saveGeneralData = function () {
            ctrl.errors = [];

            if (!ctrl.form.field) {
                ctrl.errors.push('Please provide field');
            }

            if (ctrl.errors.length === 0) {
                _taskData.field = ctrl.form.field;
                _taskData.description = ctrl.form.description;

                ctrl.currentStep = 'providePricingData';
            }
        };

        ctrl.savePricingData = function () {
            ctrl.errors = [];

            if (!ctrl.form.pricing.rate) {
                ctrl.errors.push('Please provide pricing rate');
            }

            if (ctrl.errors.length === 0) {
                _taskData.pricing = ctrl.form.pricing;
                saveTask(_taskData);
            }
        };

        function saveTask(taskData) {
            ctrl.loading = true;
            TasksService.saveTask(taskData)
                .then(function (response) {
                    ctrl.loading = false;
                    ctrl.currentStep = 'taskPostDone';
                });
        }

        ctrl.reset = function () {
            ctrl.errors = [];
            ctrl.currentStep = 'provideLocation';
            var lastLocation = _taskData.location;
            _taskData = {};
            _taskData.location = lastLocation;
            ctrl.form = {
                field: undefined,
                description: '',
                pricing: {
                    calc: 'hour',
                    rate: undefined,
                    method: 'paypal'
                }
            };
        };


    }]);