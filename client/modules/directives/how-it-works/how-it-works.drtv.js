angular.module('udo.directives')
    .directive('howItWorks', [function(){

        function handleClick() {
            angular.element('#how-it-works-content').toggleClass('open');

        }

        function link(scope, element, attrs) {
            element.on('click', handleClick);
            scope.$on('$destroy', function() {
                element.off('click', handleClick);
            });

            angular.element('#close-tab').on('click', handleClick);
        }

        return {
            restrict: 'A',
            controllerAs: 'ctrl',
            link: link
        };
    }]);

