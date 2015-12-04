;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app.homepage', {
                url: '/',
                controller: 'HomepageCtrl',
                controllerAs: 'ctrl',
                templateUrl: 'modules/views/homepage/homepage.tpl.html'
            })
    }

}).call(this);