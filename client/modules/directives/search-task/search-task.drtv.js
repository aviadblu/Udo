angular.module('udo.directives')
    .directive('searchTask', [function(){
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'modules/directives/search-task/search-task.tpl.html',
            controllerAs: 'ctrl',
            controller: ['MapSearchService', function(MapSearchService) {
                var ctrl = this;

                var _key;

                ctrl.searchKey = function (newKey) {
                    function ifChanged() {
                        _key = newKey;
                        MapSearchService.nameChanged(_key);
                        return _key;
                    }

                    return arguments.length ? ifChanged() : _key;
                };

                MapSearchService.initializeSearchBox("gmap-search");
            }]
        };
    }]);

