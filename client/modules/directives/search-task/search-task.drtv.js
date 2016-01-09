angular.module('udo.directives')
    .directive('searchTask', ['TasksService', function(TasksService){
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'modules/directives/search-task/search-task.tpl.html',
            controllerAs: 'ctrl',
            controller: ['$element', '$timeout', 'MapSearchService',function(element, $timeout, MapSearchService) {
                var ctrl = this;

                ctrl.form = {
                    place: null,
                    field: null
                };

                function initAutocomplete() {
                  var place;
                  var autocomplete = new google.maps.places.Autocomplete((document.getElementById("gmap-search")),{types: ['geocode']});
                  autocomplete.addListener('place_changed', function(){
                    place = autocomplete.getPlace();
                    ctrl.form.place = place;
                  });
                }

                $timeout(initAutocomplete, 200);

                TasksService.getFields().then(function(data){
                  ctrl.fieldsList = data;
                  ctrl.form.field = ctrl.fieldsList[0];
                });

                ctrl.search = function() {
                  if(ctrl.form.place && ctrl.form.field) {
                    console.log("search now");
                    console.log(ctrl.form);
                  }
                };
            }]
        };
    }]);
