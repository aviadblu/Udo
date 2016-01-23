;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app.s', {
                url: '/s?field&address&latitude&longitude',
                data: {
                    roles: ['guest', 'user', 'admin']
                },
                controller: 'SCtrl',
                controllerAs: 'ctrl',
                templateUrl: 'modules/views/s/s.tpl.html',
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
