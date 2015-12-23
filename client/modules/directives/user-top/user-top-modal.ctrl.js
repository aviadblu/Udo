angular.module('udo.controllers')
    .controller('userTopModalCtrl', ['$scope', '$uibModalInstance', 'user', function($scope, $uibModalInstance, user){
        var ctrl = this;
        ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        ctrl.user = user;
        
        
        
    }]);