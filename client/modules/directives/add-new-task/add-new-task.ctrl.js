angular.module('udo.controllers')
    .controller('addNewTaskCtrl', [
        '$scope',
        '$timeout',
        '$uibModalInstance',
        'principal',
        'TasksService',
        'LocationsService',
        'GoogleMapFactory',
        function ($scope,
                  $timeout,
                  $uibModalInstance,
                  principal,
                  TasksService,
                  LocationsService,
                  GoogleMapFactory) {

            var ctrl = this;
            var formattedAddress;
            var _taskData = {};
            ctrl.form = {
                field: undefined,
                description: '',
                pricing: {
                    calc: 'hour',
                    rate: undefined,
                    method: 'paypal'
                }
            };
            ctrl.loading = false;
            ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            var initStepsMap = {
                'provideLocation': initLocationStep,
                'provideGeneralData': initGeneralDataStep,
                'providePricingData': initPricingDataStep,
                'pendingTask': initPendingTaskStep,
                'taskPostDone': initTaskPostDoneStep
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
                    // check if element ready
                    var mapInstance = new GoogleMapFactory('mapContainer',true);
                    mapInstance.setCustomStyle();
                    mapInstance.initMap();
                    mapInstance.addSearchInput();
                    if(_taskData.location) {
                        mapInstance.clearInfoMarkers();
                        ctrl.addressCheck = LocationsService.analyzeAddress(_taskData.location.fullData);
                        formattedAddress = _taskData.location;
                        mapInstance.place = _taskData.location.fullData;
                        mapInstance.centerMap();
                    }
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

                    });
                });
            }

            function initGeneralDataStep() {}

            function initPricingDataStep() {}

            function initTaskPostDoneStep() {}

            function initPendingTaskStep() {
                ctrl.authenticated = principal.isAuthenticated();
                ctrl.taskData = _taskData;
            }

            function saveTask(taskData) {
                ctrl.loading = true;
                TasksService.saveTask(taskData)
                    .then(function (response) {
                        ctrl.loading = false;
                        initStep('taskPostDone');
                    });
            }

            function init() {
                TasksService.getFields()
                    .then(function (data) {
                        ctrl.fieldsList = data;
                        ctrl.form.field = ctrl.fieldsList[0];
                    });

                if(localStorage.pendingTask) {
                    _taskData = JSON.parse(localStorage.pendingTask);
                    ctrl.form = {
                        field: _taskData.field,
                        description: _taskData.description,
                        pricing: _taskData.pricing
                    };
                    initStep('pendingTask');

                } else {
                    initStep('provideLocation');
                }


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

            ctrl.saveGeneralData = function () {
                ctrl.errors = [];

                if (!ctrl.form.field) {
                    ctrl.errors.push('Please provide field');
                }

                if (ctrl.errors.length === 0) {
                    _taskData.field = ctrl.form.field;
                    _taskData.description = ctrl.form.description;
                    initStep('providePricingData');
                }
            };

            ctrl.savePricingData = function () {
                ctrl.errors = [];

                if (!ctrl.form.pricing.rate) {
                    ctrl.errors.push('Please provide pricing rate');
                }

                if (ctrl.errors.length === 0) {
                    _taskData.pricing = ctrl.form.pricing;
                    var newTaskPending = JSON.stringify(_taskData);
                    localStorage.setItem('pendingTask', newTaskPending);

                    initStep('pendingTask');
                }
            };

            ctrl.backTo = function(step) {
                initStep(step);
            };

            ctrl.startOver = function() {
                localStorage.removeItem('pendingTask');
                _taskData = {};
                ctrl.form = {
                    field: undefined,
                    description: '',
                    pricing: {
                        calc: 'hour',
                        rate: undefined,
                        method: 'paypal'
                    }
                };
                ctrl.loading = false;
                initStep('provideLocation');
            };

            ctrl.postTask = function() {
                if (principal.isAuthenticated()) {
                    saveTask(_taskData);
                }
            };

        }]);
