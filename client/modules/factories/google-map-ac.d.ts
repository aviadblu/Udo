declare var google: any;
declare var navigator: Navigator;
declare class GoogleMapAutoCompeteFactory extends EventsDispatcher {
    private inputId;
    private autocomplete;
    private _place;
    private CONST;
    place: any;
    constructor(inputId: string);
}
