declare var _: any;
declare var google: any;
declare var MarkerWithLabel: any;
declare var navigator: Navigator;
interface ILocation {
    lat: any;
    lng: any;
}
declare class GoogleMapFactory extends EventsDispatcher {
    private mapId;
    private focusCurrentLocation;
    private customStyle;
    private customStyleId;
    private mapOptions;
    private map;
    private _place;
    private infoWindows;
    private markers;
    private CONST;
    private randomString(length);
    private fillOptions();
    place: any;
    setCustomStyle(): void;
    private goTo(location);
    private addInfoMarker(place);
    private markerEvents(marker);
    constructor(mapId: string, focusCurrentLocation: boolean);
    clearInfoMarkers(): void;
    centerMap(): void;
    addSearchInput(): void;
    setCenter(LatLng: ILocation): void;
    initMap(options: any): void;
    addCustomMarker(options: any): any;
    addLabelMarker(options: any): any;
}
