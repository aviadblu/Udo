'use strict';
angular.module('udo.services')
    .service('MapSearchService', [function () {

        var mapContainer,
            map,
            searchElement,
            searchBox;
        this.initializeMap = function(containerID) {
            console.log("initializeMap");
            var mapProp = {
                zoom: 10,
                center: {lat: 52, lng: 13},
                disableDefaultUI: true,
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            };
            mapContainer = document.getElementById(containerID);
            map = new google.maps.Map(mapContainer, mapProp);
        };

        this.initializeSearchBox = function(inputId) {
            console.log("initializeSearchBox");
            if(!map) {
                console.log("not init yet");
            }
            searchElement  = document.getElementById(inputId);
            searchBox = new google.maps.places.SearchBox(searchElement);
            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        };

        this.nameChanged = function(key) {
            console.log(key);
        }
    }]);