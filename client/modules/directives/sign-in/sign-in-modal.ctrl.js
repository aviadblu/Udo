angular.module('udo.controllers')
    .controller('signInCtrl', [
        '$window',
        '$scope',
        '$timeout',
        '$uibModalInstance',
        'signIn',
        'principal',
        'UserFactory',
        function ($window,
                  $scope,
                  $timeout,
                  $uibModalInstance,
                  signIn,
                  principal,
                  UserFactory) {

            var ctrl = this;

            ctrl.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            ctrl.signIn = signIn;

            ctrl.loading = false;
            ctrl.formInProcess = false;
            ctrl.formResults = false;

            var emailFree = false;
            ctrl.initForm = function () {

                ctrl.loading = false;
                ctrl.formInProcess = false;
                ctrl.formResults = false;

                emailFree = false;
                $('#su_password').on('focus', function () {
                    $timeout(function () {
                        ctrl.showPassFeedback = true;
                    });
                });
                $('#su_password').on('blur', function () {
                    $timeout(function () {
                        ctrl.showPassFeedback = false;
                    });
                });
            };

            ctrl.checkEmail = function (email) {
                if (email) {
                    // run server check
                    UserFactory.checkEmailFree(email)
                        .then(function (res) {
                            emailFree = res.data;
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                }
            };

            ctrl.passFeedback = {};
            ctrl.checkPassword = function (pass) {
                if (pass.length < 6) {
                    ctrl.passFeedback = {
                        score: 0,
                        text: 'Too short',
                        cl: 'error'
                    };
                    return false;
                }

                var test = $window.zxcvbn(pass);
                ctrl.passFeedback = {
                    score: test.score
                };

                if (test.score === 0) {
                    ctrl.passFeedback.text = 'Too week';
                    ctrl.passFeedback.cl = 'error';
                    return false;
                }

                if (test.score === 1) {
                    ctrl.passFeedback.text = 'Week';
                    ctrl.passFeedback.cl = 'warning';
                    return true;
                }

                if (test.score === 2) {
                    ctrl.passFeedback.text = 'Fair';
                    ctrl.passFeedback.cl = 'success';
                    return true;
                }

                if (test.score === 3) {
                    ctrl.passFeedback.text = 'good';
                    ctrl.passFeedback.cl = 'success';
                    return true;
                }

                if (test.score === 4) {
                    ctrl.passFeedback.text = 'Very good';
                    ctrl.passFeedback.cl = 'success';
                    return true;
                }
            };

            ctrl.signUp = function (user) {
                if (!user) {
                    return;
                }
                ctrl.errors = [];
                if (!user.fname) {
                    ctrl.errors.push('Please provide first name');
                    angular.element('#su_fname').focus();
                    return;
                }
                if (!user.lname) {
                    ctrl.errors.push('Please provide last name');
                    angular.element('#su_lname').focus();
                    return;
                }
                if (!user.email) {
                    ctrl.errors.push('Please provide Email address');
                    angular.element('#su_email').focus();
                    return;
                }
                if (!emailFree) {
                    ctrl.errors.push('Email address already in use');
                    angular.element('#su_email').focus();
                    return;
                }
                // password
                if (!user.password) {
                    ctrl.errors.push('Please provide password');
                    angular.element('#su_password').focus();
                    return;
                }
                if (user.password.length < 6) {
                    ctrl.errors.push('Password length should be at least 6 characters');
                    angular.element('#su_password').focus();
                    return;
                }
                if (user.password.length < 6) {
                    ctrl.errors.push('Password length should be at least 6 characters');
                    angular.element('#su_password').focus();
                    return;
                }
                if (!ctrl.checkPassword(user.password)) {
                    ctrl.errors.push('Password ' + ctrl.passFeedback.text);
                    angular.element('#su_password').focus();
                    return;
                }
                if (!user.passwordConfirm) {
                    ctrl.errors.push('Please confirm your password');
                    angular.element('#su_passwordConfirm').focus();
                    return;
                }
                // check if password is the same
                if (user.passwordConfirm !== user.password) {
                    ctrl.errors.push('Password does not match the confirm password');
                    angular.element('#su_passwordConfirm').focus();
                    return;
                }

                var userToSend = angular.copy(user);
                delete userToSend.passwordConfirm;

                ctrl.loading = true;
                ctrl.formInProcess = true;

                UserFactory.newUser(userToSend)
                    .then(function (res) {

                        $window.location.href = '/';
                        //ctrl.formResults = 'Thanks for registering with UDO! An account activation message has been sent to the email address ' + user.email + '.';
                    })
                    .catch(function (err) {
                        ctrl.loading = false;
                        ctrl.formResults = '[Error] ' + err.data;
                    });
            };

            ctrl.login = function(user) {
                if (!user) {
                    return;
                }
                ctrl.errors = [];
                if (!user.email) {
                    ctrl.errors.push('Please insert your Email address');
                    angular.element('#si_email').focus();
                    return;
                }
                // password
                if (!user.password) {
                    ctrl.errors.push('Please insert your password');
                    angular.element('#si_password').focus();
                    return;
                }

                ctrl.loading = true;
                ctrl.formInProcess = true;

                UserFactory.signIn(user)
                    .then(function (res) {
                        ctrl.loading = false;
                        $window.location.href = '/';
                    })
                    .catch(function (err) {
                        ctrl.loading = false;
                        ctrl.formResults = '[Error] ' + err.data;
                    });
            };
        }]);
