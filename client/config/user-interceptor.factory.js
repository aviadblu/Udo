// authorization service's purpose is to wrap up authorize functionality
// it basically just checks to see if the principal is authenticated and checks the root state
// to see if there is a state that needs to be authorized. if so, it does a role check.
// this is used by the state resolver to make sure when you refresh, hard navigate, or drop onto a
// route, the app resolves your identity before it does an authorize check. after that,
// authorize is called from $stateChangeStart to make sure the principal is allowed to change to
// the desired state
angular.module('udo.config')
.factory('userInterceptor', [function(){  

    var userInterceptor = {
        
    };

    return userInterceptor;
}]);