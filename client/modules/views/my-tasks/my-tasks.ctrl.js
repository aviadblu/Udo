angular.module('udo.controllers')
    .controller('MyTasksCtrl', ['$timeout', '$window', 'userTasks', function($timeout, $window, userTasks){
        //console.log(openTasks);
        var ctrl = this;
        ctrl.userTasks = userTasks;

        ctrl.tasksGridOptions = {
            data: 'ctrl.userTasks',
            enableSorting: true,
            enableColumnMenus: false,
            columnDefs: [
                {
                    field: 'field',
                    name: 'Task Field'
                },
                {
                    field: 'time',
                    name: 'Posted' ,
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.time | timeAgo}}</div>'
                },
                {
                    name: 'Address' ,
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.location_name}}</div>'
                },
                {
                    field: 'pricing_rate',
                    name: 'Rate' ,
                    cellTemplate: '<div class="ui-grid-cell-contents">${{row.entity.pricing_rate}} ({{row.entity.pricing_calc}})</div>'
                }
            ]
        };

        ctrl.initGrid = function() {
            // fix for stupid ui grid
            $timeout(function(){
                angular.element($window).triggerHandler('resize');
            },1000);
        };

    }]);