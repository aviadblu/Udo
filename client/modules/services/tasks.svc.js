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

        function calculateDist(p0,p1) {
          // in radians:
          // arccos(
          //   sin(lat1) · sin(lat2) +
          //   cos(lat1) · cos(lat2) · cos(lon1 - lon2)
          // )
          var lat1 = p0[0] * Math.PI / 180, // conversion to radians
              lon1 = p0[1] * Math.PI / 180,
              lat2 = p1[0] * Math.PI / 180,
              lon2 = p1[1] * Math.PI / 180,
              R = 6371;

          return Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
          ) * R;
        }

        this.saveTask = function(taskData) {
            return $http.post('/api/tasks', taskData);
        };

        this.userTasks = function() {
            return $http.get('/api/users/user-tasks');
        };

        this.getOpenTasks = function() {
            return $http.get('/api/tasks');
        };

        this.updateDistance = function(currLocation, tasksArr, radius) {
          var retArr = [];
          tasksArr.forEach(function(task){
            task.distance = calculateDist(currLocation, [parseFloat(task.location_latitude), parseFloat(task.location_longitude)]);
            retArr.push(task);
          });
          return retArr;
        };

    }]);
