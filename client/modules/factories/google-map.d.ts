declare var google: any;
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
    private CONST;
    private randomString(length);
    private fillOptions();
    place: any;
    setCustomStyle(): void;
    goTo(location: ILocation): void;
    addSearchInput(): void;
    constructor(mapId: string, focusCurrentLocation: boolean);
    initMap(): void;
}
