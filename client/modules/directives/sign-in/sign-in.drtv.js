angular.module('udo.directives')
    .directive('signIn', ['$uibModal', function($uibModal) {

        function openModal(signIn) {
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'modules/directives/sign-in/sign-in.modal.tpl.html',
                controller: 'signInCtrl',
                controllerAs: 'ctrl',
                size: 'sm',
                resolve: {
                    signIn: signIn
                }
            });
            
            modalInstance.result.then(function () {

            }, function () {
                console.warn('Modal dismissed at: ' + new Date());
            });
        }

        function prepareCall(signInFlag) {
            return function() {
                openModal(signInFlag);
            }
        }

        function link(scope, element, attrs) {
            element.on('click', prepareCall(scope.signIn ? true : false));
            scope.$on('$destroy', function() {
                element.off('click', openModal);
            });
        }

        return {
            restrict: 'A',
            scope: {signIn:'@'},
            controllerAs: 'ctrl',
            link: link
        };
    }]);

