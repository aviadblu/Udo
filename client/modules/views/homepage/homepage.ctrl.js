angular.module('udo.controllers')
    .controller('HomepageCtrl', ['$timeout', 'principal', 'user', function ($timeout, principal, user) {
        var ctrl = this;
        ctrl.user = user;
    }]);