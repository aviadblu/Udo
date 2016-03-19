'use strict';
declare var google:any;
declare var navigator:Navigator;

interface ILocation {
    lat;
    lng;
}

class GoogleMapFactory extends EventsDispatcher {
    private mapId:string;
    private focusCurrentLocation:boolean;
    private customStyle:any;
    private customStyleId:string;
    private mapOptions:any;
    private map:any;
    private _place:any;
    private CONST = {
        events: {
            'newPlaceSelected': 'newPlaceSelected'
        }
    };

    private randomString(length:number):string {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

        if (!length) {
            length = Math.floor(Math.random() * chars.length);
        }

        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    private fillOptions():void {
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
            }
        }
    }

    get place():any {
        return this._place;
    }

    public setCustomStyle():void {
        this.customStyle = new google.maps.StyledMapType([
            {
                stylers: [
                    {hue: '#00C3BF'},
                    {visibility: 'simplified'},
                    {gamma: 0.5},
                    {weight: 0.5}
                ]
            },
            {
                featureType: 'water',
                stylers: [{color: '#1f8dd6'}]
            }
        ], {
            name: 'Custom Style'
        });

        this.customStyleId = 'custom_style';
    }

    public goTo(location:ILocation):void {
        this.map.setCenter(location);
        this.map.setZoom(17);
    }

    public addSearchInput():void {
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

        // init search result info window
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: _self.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        // create listener for search completion
        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);

            _self._place = autocomplete.getPlace();
            _self.dispatch.apply(_self, [_self.CONST.events.newPlaceSelected,_self._place]);

            if (!_self._place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (_self._place.geometry.viewport) {
                _self.map.fitBounds(_self._place.geometry.viewport);
            } else {
                _self.goTo(_self._place.geometry.location);
            }

            marker.setIcon(/** @type {google.maps.Icon} */({
                url: _self._place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(_self._place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (_self._place.address_components) {
                address = [
                    (_self._place.address_components[0] && _self._place.address_components[0].short_name || ''),
                    (_self._place.address_components[1] && _self._place.address_components[1].short_name || ''),
                    (_self._place.address_components[2] && _self._place.address_components[2].short_name || '')
                ].join(' ');
            }

            infowindow.setContent('<div><strong>' + _self._place.name + '</strong><br>' + address);
            infowindow.open(_self.map, marker);
        });

    }

    constructor(mapId:string, focusCurrentLocation:boolean) {
        super();
        this.mapId = mapId;
        this.focusCurrentLocation = focusCurrentLocation;
    }

    public initMap():void {
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
            } else {
                // Browser doesn't support Geolocation
                //handleLocationError(false, infoWindow, map.getCenter());
            }
        }

    }
}