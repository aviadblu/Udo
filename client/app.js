(function (window, angular) {
    'use strict';

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
    'udo'
])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider' ,function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
}]);
