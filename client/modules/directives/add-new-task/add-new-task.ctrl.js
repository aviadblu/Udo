angular.module('udo.controllers')
    .controller('addNewTaskCtrl', [
        '$scope',
        '$timeout',
        '$uibModalInstance',
        'TasksService',
        'LocationsService',
        'GoogleMapFactory',
        function ($scope,
                  $timeout,
                  $uibModalInstance,
                  TasksService,
                  LocationsService,
                  GoogleMapFactory) {

            var ctrl = this;
            ctrl.loading = false;
            ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            var initStepsMap = {
                'provideLocation': initLocationStep
            };

            function initStep(step) {
                if(initStepsMap[step]) {
                    initStepsMap[step]();
                    ctrl.currentStep = step;
                } else {
                    console.error('Init step failed!');
                }
            }

            function initLocationStep() {
                $timeout(function() {
                    console.log('initLocationStep called');
                    // check if element ready
                    var map = new GoogleMapFactory();

                });
            }


            function init() {
                TasksService.getFields()
                    .then(function (data) {
                        console.log(data);
                    });

                initStep('provideLocation');
            }

            init();


        }]);
