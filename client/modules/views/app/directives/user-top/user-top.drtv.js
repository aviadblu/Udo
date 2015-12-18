angular.module('udo.directives')
    .directive('userTop', [function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'modules/views/app/directives/user-top/user-top.tpl.html',
            controllerAs: 'ctrl',
            controller: ['principal', function(principal) {
                var ctrl = this;
                principal.identity()
                    .then(function(user){
                        if(user.roles && user.roles.indexOf('guest') === -1) {
                            ctrl.user = user;
                        }
                    });
            }]
        };
    }]);

