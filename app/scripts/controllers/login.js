'use strict';

angular.module('firebaseappApp')
  .controller('LoginController', function($scope, simpleLogin, $firebaseSimpleLogin, FBURL) {
    // $scope.pass = null;
    // $scope.err = null;
    // $scope.user = null;

    // $scope.login = function(service) {
    //   simpleLogin.login(service, function(err) {
    //     $scope.err = err? err + '' : null;
    //   });
    // };

    $scope.loginService = $firebaseSimpleLogin(new Firebase(FBURL));
    $scope.newUser = { email: '', password: '' };
    $scope.currentUser = null;

    $scope.login = function(email, password) {
      $scope.loginService.$login('password', {email:email, password:password})
        .then(function(user) {
          $scope.currentUser = user;
            $scope.resetForm();
        });
    };

    $scope.register = function(email, password) {
      $scope.loginService.$createUser(email, password)
        .then(function(user) {
          $scope.currentUser = user;
            $scope.resetForm();
        });
    };

    $scope.resetForm = function() {
      $scope.newUser = { email: '', password: '' };
    };

    $scope.logout = function() {
      simpleLogin.logout();
    };

  });
