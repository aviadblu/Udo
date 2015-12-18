;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app.accessdenied', {
                url: '/accessdenied',
                data: {
                    roles: ['guest', 'user', 'admin']
                },
                controller: function(){},
                controllerAs: 'ctrl',
                templateUrl: 'modules/views/accessdenied/accessdenied.tpl.html'
            })
    }

}).call(this);