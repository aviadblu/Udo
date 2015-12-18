(function (window, angular) {
    'use strict';

    angular
        .module('udo.config', []);

    angular
        .module('udo.services', []);

    angular
        .module('udo.factories', []);

    angular
        .module('udo.controllers', []);

    angular
        .module('udo.filters', []);

    angular
        .module('udo.constants', []);

    angular
        .module('udo.directives', []);


    angular
        .module('udo', [
            'udo.config',
            'udo.services',
            'udo.factories',
            'udo.controllers',
            'udo.filters',
            'udo.constants',
            'udo.directives'
        ]);

})(window, window.angular);

angular.module('udoApp', [
        'ui.router',
        'ui.bootstrap',
        'udo'
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");
    }])
    .run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
        function ($rootScope, $state, $stateParams, authorization, principal) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;

                if (principal.isIdentityResolved()) {
                    authorization.authorize();
                }
                else {
                    principal.identity()
                        .then(function(){
                            authorization.authorize();
                        });
                }
            });
        }
    ]);
