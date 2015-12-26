angular.module('udo.controllers')
    .controller('FindjobCtrl', ['$timeout', '$window', 'openTasks', function($timeout, $window, openTasks){
        //console.log(openTasks);
        var ctrl = this;
        ctrl.openTasks = openTasks;

        ctrl.tasksGridOptions = {
            data: 'ctrl.openTasks',
            enableSorting: true,
            enableColumnMenus: false,
            columnDefs: [
                {
                    field: 'field',
                    name: 'Task Field'
                },
                {
                    field: 'fname',
                    name: 'Posted' ,
                    cellTemplate: '<div class="ui-grid-cell-contents grid-user"> <img ng-src="{{row.entity.picture}}"> {{row.entity.time | timeAgo}}</div>'
                },
                {
                    name: 'Where?' ,
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