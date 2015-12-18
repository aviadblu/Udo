;(function(){
    'use strict';
    angular
        .module('udoApp')
        .config(Configuration);

    /* @ngInject */
    function Configuration($stateProvider) {
        // Contact state routing
        $stateProvider
            .state('app.upload', {
                url: '/upload',
                data: {
                    roles: ['user', 'admin']
                },
                controller: 'UploadjobCtrl',
                controllerAs: 'ctrl',
                templateUrl: 'modules/views/uploadjob/uploadjob.tpl.html'
            })
    }

}).call(this);