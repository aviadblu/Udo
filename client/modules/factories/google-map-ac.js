'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GoogleMapAutoCompeteFactory = (function (_super) {
    __extends(GoogleMapAutoCompeteFactory, _super);
    function GoogleMapAutoCompeteFactory(inputId) {
        _super.call(this);
        this.CONST = {
            events: {
                'newPlaceSelected': 'newPlaceSelected'
            }
        };
        var _self = this;
        this.inputId = inputId;
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (document.getElementById(_self.inputId)), { types: ['geocode'] });
        // create listener for search completion
        this.autocomplete.addListener('place_changed', function () {
            _self._place = _self.autocomplete.getPlace();
            _self.dispatch.apply(_self, [_self.CONST.events.newPlaceSelected, _self._place]);
            if (!_self._place.geometry) {
                //window.alert("Autocomplete's returned place contains no geometry");
                return;
            }
        });
    }
    Object.defineProperty(GoogleMapAutoCompeteFactory.prototype, "place", {
        get: function () {
            return this._place;
        },
        enumerable: true,
        configurable: true
    });
    return GoogleMapAutoCompeteFactory;
}(EventsDispatcher));
//# sourceMappingURL=google-map-ac.js.map