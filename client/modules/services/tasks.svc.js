'use strict';
angular.module('udo.services')
    .service('TasksService', ['$http', '$q', function ($http, $q) {

        var _fieldsList = [];
        for(var i = 0;i < 10; i++){
          _fieldsList.push({
            id: i+1,
            name: "field " + (i + 1)
          });
        }

        this.getFields = function() {
          var deferred = $q.defer();
          deferred.resolve(_fieldsList);
          return deferred.promise;
        };
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
