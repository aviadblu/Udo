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
                templateUrl: 'modules/views/app/app.tpl.html',
                controller:['$timeout', 'user', 'userTasks', function($timeout, user, userTasks) {
                    var ctrl = this;
                    ctrl.user = user;
                    ctrl.userTasks = userTasks;
                    
                    ctrl.appReady = false;
                    
                    function init() {
                        ctrl.appReady = true;
                    }
                    
                    $timeout(function(){
                        init();
                    },500);
                    
                }],
                controllerAs: 'ctrl',
                resolve: { 
                    user: function(principal){
                        return principal.identity()
                    },
                    userTasks: function(TasksService) {
                        return TasksService.userTasks()
                            .then(function(result) {
                                return result.data;
                            })
                    }
                }
            })
    }

}).call(this);
