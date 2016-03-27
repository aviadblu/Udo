angular.module('udo.factories')
    .factory('UserFactory', [ '$http', '$q', function($http, $q){

        return {
            checkEmailFree: function(email) {
                return $http.post('/api/users/checkEmailFree',{
                    email: email
                });
            },
            newUser: function(user) {
                return $http.post('/auth/signup',user);
            },
            signIn: function(user) {
                return $http.post('/auth/login', user);
            }
        };
    }]);