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
            var formattedAddress;
            var _taskData = {};
            ctrl.loading = false;
            ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            var initStepsMap = {
                'provideLocation': initLocationStep,
                'provideGeneralData': initGeneralDataStep
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
                    var mapInstance = new GoogleMapFactory('mapContainer',true);
                    mapInstance.setCustomStyle();
                    mapInstance.initMap();
                    mapInstance.addSearchInput();
                    mapInstance.on('newPlaceSelected', function(event, place){
                        ctrl.addressCheck = LocationsService.analyzeAddress(place);
                        if(ctrl.addressCheck) {
                            ctrl.errors = [];
                            formattedAddress = LocationsService.formatAddress(place);
                        }
                        else {
                            ctrl.errors = ['Invalid address'];
                            formattedAddress = null;
                        }
                        $scope.$digest();

                    })
                });
            }

            function initGeneralDataStep() {}

            function init() {
                TasksService.getFields()
                    .then(function (data) {
                        ctrl.fieldsList = data;
                        ctrl.form.field = ctrl.fieldsList[0];
                    });

                initStep('provideLocation');
            }

            init();

            ctrl.saveLocation = function () {
                ctrl.errors = [];
                if (!ctrl.addressCheck) {
                    ctrl.errors.push('Invalid address');
                }
                else {
                    _taskData.location = formattedAddress;
                    initStep('provideGeneralData');
                }
            };


        }]);
