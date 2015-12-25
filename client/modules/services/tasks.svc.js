'use strict';
angular.module('udo.services')
    .service('TasksService', ['$http', function ($http) {
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