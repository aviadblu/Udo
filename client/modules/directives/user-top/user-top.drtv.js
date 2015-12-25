angular.module('udo.directives')
    .directive('userTop', ['$uibModal', function($uibModal) {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            templateUrl: 'modules/directives/user-top/user-top.tpl.html',
            controllerAs: 'ctrl',
            controller: ['$scope', 'principal', function($scope, principal) {
                var ctrl = this;
                ctrl.user = $scope.user;
                    
                ctrl.userClick = function() {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'modules/directives/user-top/user-top-modal.tpl.html',
                        controller: 'userTopModalCtrl',
                        controllerAs: 'ctrl',
                        size: 'sm',
                        resolve: {
                            user: function () {
                              return ctrl.user;
                            }
                          }
                    });

                    modalInstance.result.then(function () {
                        
                    }, function () {
                        console.warn('Modal dismissed at: ' + new Date());
                    });
                };
            }]
        };
    }]);

