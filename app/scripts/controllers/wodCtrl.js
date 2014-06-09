'use strict';

angular.module('firebaseappApp')
  .controller('WodCtrl',['$scope', '$location', 'WodService', function ($scope, $location, WodService) {
    $scope.wods = WodService.getAllWods();

    $scope.addWod = function() {
        WodService.newWod($scope.newWod);
        $location.path('/library');
    };

    $scope.removeWod = function(wodId) {
        WodService.removeWod(wodId);
    };

    $scope.updateWod = function(wodId) {
        WodService.updateWod(wodId);
        $location.path('/updateWod');
    };

    $scope.randomWod = function() {
        $scope.chosenWod = WodService.randomWod();

    };
  
  }]);