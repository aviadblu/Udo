angular.module('udo.directives')
    .directive('addNewTask', ['$uibModal', function($uibModal) {

        function uploadOne() {
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'modules/directives/add-new-task/add-new-task.modal.tpl.html',
                controller: 'addNewTaskCtrl',
                controllerAs: 'ctrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                
            }, function () {
                
            });
        }

        function link(scope, element, attrs) {
            element.on('click', uploadOne);
            scope.$on('$destroy', function() {
                element.off('click', uploadOne);
            });
        }

        return {
            restrict: 'A',
            scope: {},
            controllerAs: 'ctrl',
            link: link
        };
    }]);

