;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app', {
                data: {
                    roles: ['guest', 'user', 'admin']
                },
                abstract: true,
                templateUrl: 'modules/views/app/app.tpl.html'
            })
    }

}).call(this);
