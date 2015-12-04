;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app.findjob', {
                url: '/findjob',
                controller: 'FindjobCtrl',
                controllerAs: 'ctrl',
                templateUrl: 'modules/views/findjob/findjob.tpl.html'
            })
    }

}).call(this);