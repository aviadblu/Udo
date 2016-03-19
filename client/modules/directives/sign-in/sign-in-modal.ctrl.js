angular.module('udo.controllers')
    .controller('signInCtrl', [
        '$scope',
        '$timeout',
        '$uibModalInstance',
        'signIn',
        'principal',
        function ($scope,
                  $timeout,
                  $uibModalInstance,
                  signIn,
                  principal) {

            var ctrl = this;
            ctrl.signIn = signIn;
        }]);
