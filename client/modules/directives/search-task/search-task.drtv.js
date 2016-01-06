angular.module('udo.directives')
    .directive('searchTask', [function(){
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'modules/directives/search-task/search-task.tpl.html',
            controllerAs: 'ctrl',
            controller: ['principal', function(principal) {
                var ctrl = this;
                ctrl.authenticated = principal.isAuthenticated();

            }]
        };
    }]);

