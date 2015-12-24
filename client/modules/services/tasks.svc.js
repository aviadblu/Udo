'use strict';
angular.module('udo.services')
    .service('TasksService', ['$http', function ($http) {
        this.saveTask = function(taskData) {
            return $http.post('/api/tasks', taskData);
        };
    
    }]);