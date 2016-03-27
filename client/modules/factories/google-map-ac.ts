'use strict';
declare var google:any;
declare var navigator:Navigator;

class GoogleMapAutoCompeteFactory extends EventsDispatcher {
    private inputId:string;
    private autocomplete:any;
    private _place:any;

    private CONST = {
        events: {
            'newPlaceSelected': 'newPlaceSelected'
        }
    };


    get place():any {
        return this._place;
    }

    constructor(inputId:string) {
        super();
        var _self = this;

        this.inputId = inputId;

        // Create the autocomplete object, restricting the search to geographical
        // location types.
        this.autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(_self.inputId)),
            {types: ['geocode']});
        
        // create listener for search completion
        this.autocomplete.addListener('place_changed', function() {


            _self._place = _self.autocomplete.getPlace();
            _self.dispatch.apply(_self, [_self.CONST.events.newPlaceSelected,_self._place]);

            if (!_self._place.geometry) {
                //window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

        });
    }

}