'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GoogleMapFactory = (function (_super) {
    __extends(GoogleMapFactory, _super);
    function GoogleMapFactory(mapId, focusCurrentLocation) {
        _super.call(this);
        this.infoWindows = [];
        this.markers = [];
        this.CONST = {
            events: {
                'newPlaceSelected': 'newPlaceSelected'
            }
        };
        this.mapId = mapId;
        this.focusCurrentLocation = focusCurrentLocation;
    }
    GoogleMapFactory.prototype.randomString = function (length) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        if (!length) {
            length = Math.floor(Math.random() * chars.length);
        }
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };
    GoogleMapFactory.prototype.fillOptions = function () {
        var _self = this;
        this.mapOptions = {
            control: {},
            center: {
                lat: 40.74349,
                lng: -73.990822
            },
            zoom: 15,
            disableDefaultUI: true,
            dragging: true,
            bounds: {},
            markers: [],
            idkey: 'place_id'
        };
        if (this.customStyle) {
            this.mapOptions['mapTypeControlOptions'] = {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, _self.customStyleId]
            };
        }
    };
    Object.defineProperty(GoogleMapFactory.prototype, "place", {
        get: function () {
            return this._place;
        },
        set: function (value) {
            this._place = value;
        },
        enumerable: true,
        configurable: true
    });
    GoogleMapFactory.prototype.setCustomStyle = function () {
        this.customStyle = new google.maps.StyledMapType([
            {
                stylers: [
                    { hue: '#00C3BF' },
                    { visibility: 'simplified' },
                    { gamma: 0.5 },
                    { weight: 0.5 }
                ]
            },
            {
                featureType: 'water',
                stylers: [{ color: '#1f8dd6' }]
            }
        ], {
            name: 'Custom Style'
        });
        this.customStyleId = 'custom_style';
    };
    GoogleMapFactory.prototype.goTo = function (location) {
        this.map.setCenter(location);
        this.map.setZoom(17);
    };
    GoogleMapFactory.prototype.addInfoMarker = function (place) {
        // marker
        var _self = this;
        var marker = new google.maps.Marker({
            anchorPoint: new google.maps.Point(0, -29),
            map: _self.map
        });
        marker.setVisible(false);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        marker.setIcon(/** @type {google.maps.Icon} */ ({
            url: _self._place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        _self.markers.push(marker);
        // info window
        var infowindow = new google.maps.InfoWindow();
        infowindow.close();
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(_self.map, marker);
        _self.infoWindows.push(infowindow);
    };
    GoogleMapFactory.prototype.clearInfoMarkers = function () {
        var _self = this;
        for (var i = 0; i < _self.markers.length; i++) {
            _self.markers[i].setMap(null);
        }
        _self.markers = [];
        _self.markers = [];
    };
    GoogleMapFactory.prototype.centerMap = function () {
        var place = this._place;
        if (place) {
            this.clearInfoMarkers();
            this.goTo(place.geometry.location);
            this.addInfoMarker(place);
        }
    };
    GoogleMapFactory.prototype.addSearchInput = function () {
        var _self = this;
        // create DOM element
        var input = document.createElement('input');
        input.id = 'input_' + this.randomString(4);
        input.className = 'controls gmapInput';
        input.type = 'text';
        input.placeholder = 'Enter a location';
        // add to map
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // add autocomplete dropdown functionality
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', _self.map);
        // create listener for search completion
        autocomplete.addListener('place_changed', function () {
            _self._place = autocomplete.getPlace();
            _self.dispatch.apply(_self, [_self.CONST.events.newPlaceSelected, _self._place]);
            if (!_self._place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (_self._place.geometry.viewport) {
                _self.map.fitBounds(_self._place.geometry.viewport);
            }
            else {
                _self.goTo(_self._place.geometry.location);
            }
            _self.clearInfoMarkers();
            _self.addInfoMarker(_self._place);
        });
    };
    GoogleMapFactory.prototype.initMap = function () {
        var _self = this;
        this.fillOptions();
        this.map = new google.maps.Map(document.getElementById(_self.mapId), _self.mapOptions);
        if (this.customStyle) {
            this.map.mapTypes.set(this.customStyleId, this.customStyle);
            this.map.setMapTypeId(this.customStyleId);
        }
        if (this.focusCurrentLocation) {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    _self.map.setCenter(pos);
                }, function () {
                    // handleLocationError(true, infoWindow, map.getCenter());
                });
            }
            else {
            }
        }
    };
    return GoogleMapFactory;
}(EventsDispatcher));
//# sourceMappingURL=google-map.js.map