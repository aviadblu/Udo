angular.module('udo.controllers')
    .controller('HomepageCtrl', ['principal', 'user', function(principal, user){
        var ctrl = this;
        ctrl.user = user;
    }]);