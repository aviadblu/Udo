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
                controller:['$timeout', function($timeout) {
                    var ctrl = this;
                    
                    ctrl.appReady = false;
                    
                    function init() {
                        ctrl.appReady = true;
                    }
                    
                    $timeout(function(){
                        init();
                    },2000);
                    
                }],
                controllerAs: 'ctrl'
            })
    }

}).call(this);
