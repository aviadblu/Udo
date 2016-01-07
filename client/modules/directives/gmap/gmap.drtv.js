angular.module('udo.directives')
    .directive('gmap', [function(){
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            template: '<div id="gmap-container" ng-init="ctrl.initMap()"></div>',
            controllerAs: 'ctrl',
            controller: ['$timeout', 'MapSearchService', function($timeout, MapSearchService) {
                var ctrl = this;
                ctrl.initMap = function () {
                    $timeout(function () {
                        MapSearchService.initializeMap("gmap-container");
                    }, 500);
                };

            }]
        };
    }]);

