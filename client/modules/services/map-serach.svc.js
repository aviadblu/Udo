'use strict';
angular.module('udo.services')
    .service('MapSearchService', [function () {

        var mapElement,
            searchElement,
            mapProp = {
                zoom: 10,
                center: {lat: 52, lng: 13},
                disableDefaultUI: true,
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            };


        this.initializeMap = function (containerID) {
            console.log("initializeMap");

            mapElement = document.getElementById(containerID);
            //map = new google.maps.Map(mapContainer, mapProp);
            checkIfReady();
        };

        this.initializeSearchBox = function (inputId) {
            console.log("initializeSearchBox");
            //if(!map) {
            //    console.log("not init yet");
            //}
            searchElement = document.getElementById(inputId);
            //searchBox = new google.maps.places.SearchBox(searchElement);
            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            checkIfReady();
        };

        function initAutocomplete() {
          // Create the autocomplete object, restricting the search to geographical
          // location types.
          var autocomplete = new google.maps.places.Autocomplete((searchElement),{types: ['geocode']});

          // When the user selects an address from the dropdown, populate the address
          // fields in the form.
          // autocomplete.addListener('place_changed', fillInAddress);
        }

        function init() {
            var map = new google.maps.Map(mapElement, mapProp);

            var input = searchElement;
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29)
            });

            autocomplete.addListener('place_changed', function () {
                infowindow.close();
                marker.setVisible(false);
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("Autocomplete's returned place contains no geometry");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);  // Why 17? Because it looks good.
                }
                marker.setIcon(/** @type {google.maps.Icon} */({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(map, marker);
            });
        }

        function checkIfReady() {
            if (mapElement && searchElement) {
                //init();
                initAutocomplete();
            }
        }

        this.nameChanged = function (key) {
            console.log(key);
        }
    }]);
