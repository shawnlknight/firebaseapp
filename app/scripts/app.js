'use strict';

var app = angular.module('firebaseappApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase',
    'angularfire.firebase',
    'angularfire.login',
    'simpleLoginTools',
    'google-maps'
  ]);

app.constant('FBURL', 'https://ngfirebaseapp.firebaseio.com');

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'WodCtrl'
      })
      .when('/random', {
        authRequired: true,
        templateUrl: 'views/random.html',
        controller: 'WodCtrl'
      })
      .when('/library', {
        authRequired: true,
        templateUrl: 'views/library.html',
        controller: 'WodCtrl'
      })
      .when('/newWod', {
        authRequired: true,
        templateUrl: 'views/newWod.html',
        controller: 'WodCtrl'
      })
      .when('/updateWod', {
        authRequired: true,
        templateUrl: 'views/updateWod.html',
        controller: 'WodCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
