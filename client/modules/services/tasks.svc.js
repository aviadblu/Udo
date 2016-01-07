'use strict';
angular.module('udo.services')
    .service('TasksService', ['$http', function ($http) {
        
        //var fieldsList = {};
        //function init() {
        //    $http.get('/api/locations')
        //        .then(function(result){
        //            allowedCountries = result.data;
        //        });
        //}
        //init();
        
        this.saveTask = function(taskData) {
            return $http.post('/api/tasks', taskData);
        };
        
        this.userTasks = function() {
            return $http.get('/api/users/user-tasks');
        };

        this.getOpenTasks = function() {
            return $http.get('/api/tasks');
        };
    
    }]);