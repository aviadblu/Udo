declare var _: any;
declare class EventsDispatcher {
    private eventListeners;
    constructor();
    on(eventName: any, eventListener: any, scope: any): any;
    dispatch(eventName: any): void;
    hasListeners(eventName: any): boolean;
}
