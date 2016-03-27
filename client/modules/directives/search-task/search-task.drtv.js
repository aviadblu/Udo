angular.module('udo.directives')
    .directive('searchTask', [
        'TasksService',
        'GoogleMapAutoCompeteFactory',
        function (TasksService,
                  GoogleMapAutoCompeteFactory) {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                templateUrl: 'modules/directives/search-task/search-task.tpl.html',
                controllerAs: 'ctrl',
                controller: ['$element', '$timeout', '$state', 'MapSearchService', function (element, $timeout, $state, MapSearchService) {
                    var ctrl = this;
                    var ac;

                    ctrl.form = {
                        place: null,
                        field: null
                    };

                    $timeout(function () {
                        ac = new GoogleMapAutoCompeteFactory('gmap-search');
                        ac.on('newPlaceSelected',function(e,place){
                            ctrl.form.place = place;
                        });
                    }, 200);

                    TasksService.getFields().then(function (data) {
                        ctrl.fieldsList = data;
                        ctrl.form.field = ctrl.fieldsList[0];
                    });

                    ctrl.search = function () {
                        if (ctrl.form.place && ctrl.form.place.geometry && ctrl.form.field) {
                            $state.go('app.s', {
                                field: ctrl.form.field.id,
                                address: ctrl.form.place.formatted_address,
                                latitude: ctrl.form.place.geometry.location.lat(),
                                longitude: ctrl.form.place.geometry.location.lng()
                            });
                        }
                    };
                }]
            };
        }]);
