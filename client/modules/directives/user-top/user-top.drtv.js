angular.module('udo.directives')
    .directive('userTop', ['$uibModal', function($uibModal) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'modules/directives/user-top/user-top.tpl.html',
            controllerAs: 'ctrl',
            controller: ['principal', function(principal) {
                var ctrl = this;
                principal.identity()
                    .then(function(user){
                        if(user.roles && user.roles.indexOf('guest') === -1) {
                            ctrl.user = user;
                        }
                    });
                    
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

