// authorization service's purpose is to wrap up authorize functionality
// it basically just checks to see if the principal is authenticated and checks the root state
// to see if there is a state that needs to be authorized. if so, it does a role check.
// this is used by the state resolver to make sure when you refresh, hard navigate, or drop onto a
// route, the app resolves your identity before it does an authorize check. after that,
// authorize is called from $stateChangeStart to make sure the principal is allowed to change to
// the desired state
angular.module('udo.config')
    .factory('principal', ['$q', '$http',
        function ($q, $http) {
            var _identity = undefined,
                _authenticated = false;

            return {
                isIdentityResolved: function () {
                    return angular.isDefined(_identity);
                },
                isAuthenticated: function () {
                    return _authenticated && _identity.roles.indexOf('guest') < 0;
                },
                isInRole: function (role) {
                    if (!_authenticated || !_identity.roles) return false;

                    return _identity.roles.indexOf(role) != -1;
                },
                isInAnyRole: function (roles) {
                    if (!_authenticated || !_identity.roles) return false;

                    for (var i = 0; i < roles.length; i++) {
                        if (this.isInRole(roles[i])) return true;
                    }

                    return false;
                },
                authenticate: function (identity) {
                    _identity = identity;
                    _authenticated = identity != null;

                    // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
                    if (identity) localStorage.setItem("demo.identity", angular.toJson(identity));
                    else localStorage.removeItem("demo.identity");
                },
                identity: function (force) {
                    var deferred = $q.defer();

                    if (force === true) _identity = undefined;

                    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);
                        return deferred.promise;
                    }

                    // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
                    $http.get('/auth/identity', {ignoreErrors: true})
                        .success(function (data) {
                            _identity = data[0];
                            _identity.authenticated = _identity.roles.indexOf('guest') < 0;
                            _authenticated = true;
                            deferred.resolve(_identity);
                        })
                        .error(function () {
                            _identity = null;
                            _identity.authenticated = false;
                            _authenticated = false;
                            deferred.resolve(_identity);
                        });

                    // for the sake of the demo, we'll attempt to read the identity from localStorage. the example above might be a way if you use cookies or need to retrieve the latest identity from an api
                    // i put it in a timeout to illustrate deferred resolution
                    //var self = this;
                    //$timeout(function () {
                    //    _identity = angular.fromJson(localStorage.getItem("demo.identity"));
                    //    self.authenticate(_identity);
                    //    deferred.resolve(_identity);
                    //}, 1000);

                    return deferred.promise;
                }
            };
        }
    ]);