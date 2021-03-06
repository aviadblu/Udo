;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app.find', {
                url: '/find',
                data: {
                    roles: ['guest', 'user', 'admin']
                },
                controller: 'FindjobCtrl',
                controllerAs: 'ctrl',
                templateUrl: 'modules/views/findjob/findjob.tpl.html',
                resolve: {
                    openTasks: function(TasksService) {
                        return TasksService.getOpenTasks()
                            .then(function(result) {
                                return result.data;
                            })
                    }
                }
            })
    }

}).call(this);