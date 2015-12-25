;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app.my-tasks', {
                url: '/my-tasks',
                data: {
                    roles: ['guest', 'user', 'admin']
                },
                controller: 'MyTasksCtrl',
                controllerAs: 'ctrl',
                templateUrl: 'modules/views/my-tasks/my-tasks.tpl.html'
            })
    }

}).call(this);