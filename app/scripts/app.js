'use strict';

angular
  .module('firebaseappApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'angularfire.firebase',
    'angularfire.login',
    'simpleLoginTools',
    'google-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'WodCtrl'
      })
      .when('/library', {
        authRequired: true,
        templateUrl: 'views/library.html',
        controller: 'WodCtrl'
      })
      .when('/newWod', {
        templateUrl: 'views/newWod.html',
        controller: 'WodCtrl'
      })
      .when('/updateWod', {
        templateUrl: 'views/updateWod.html',
        controller: 'WodCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        authRequired: false, // if true, must log in before viewing this page
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
