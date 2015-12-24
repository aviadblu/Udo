angular.module('udo.controllers')
    .controller('HomepageCtrl', ['principal', function(principal){
        var ctrl = this;
        ctrl.isAuthenticated = principal.isAuthenticated();
    }]);