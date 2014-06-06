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

    $scope.updateWod = function(wod) {
        WodService.updateWod(wod);
        $location.path('/updateWod');
    };

    $scope.randomWod = function(wodId) {
        WodService.randomWod(wodId);
    };
  
  }]);