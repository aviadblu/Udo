angular.module('udo.directives')
    .directive('uploadOne', ['$uibModal', function($uibModal) {
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'modules/directives/upload-one/upload-one.tpl.html',
            controllerAs: 'ctrl',
            controller: ['principal', function(principal) {
                var ctrl = this;
                ctrl.authenticated = principal.isAuthenticated();

                ctrl.uploadOne = function() {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'modules/directives/upload-one/upload-one-modal.tpl.html',
                        controller: 'uploadOneModalCtrl',
                        controllerAs: 'ctrl',
                        size: 'lg'
                    });

                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        console.warn('Modal dismissed at: ' + new Date());
                    });
                };

            }]
        };
    }]);

