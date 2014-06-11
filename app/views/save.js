  // This is an attempt to relate data to current user logged in

// $rootScope.currentUser = UsersService.getCurrentUser;

'use strict';

var app = angular.module('firebaseappApp');

app.controller('WodCtrl', ['$scope', '$location', 'ItemsService', 'UsersService', function ($scope, $location, ItemsService, UsersService) {
    $scope.newItem = { title: '', content: '' };
    $scope.currentItem = null;
    $scope.currentUser = null;
    $scope.items = null

    $scope.user = UsersService.getUser();

    $scope.$watch('currentUser', function() {
        UsersService.setCurrentUser($scope.currentUser);

        if ($scope.currentUser) {
            $scope.items = UsersService.getItemsForCurrentUser();
        }
    });

    $scope.addItem = function() {
        ItemsService.addItem(angular.copy($scope.newItem));
        $scope.newItem = { title: '', content: '' };
        $location.path('/library');
    };

}]);

app.directive('item', ['$firebase', 'FBURL', 'ItemsService', function ($firebase, FBURL, ItemsService) {
    var linker = function(scope, element, attrs) {
        scope.itemId = attrs['itemId'];
        scope.myItem = $firebase(new Firebase(FBURL + 'items/' + scope))
    };

    var controller = function($scope) {
        $scope.updateItem = function() {
            // Update internally since it is a local concern
            $scope.myItem.$save();
        };

        $scope.removeItem = function() {
            // Delegate deletion since it is a global concern
            ItemsService.removeItem($scope.itemId);
        };
    };

    return {
        scope: true,
        link: linker,
        controller: controller
    };
}]);

app.factory('UsersService', ['$firebase', 'FBURL', function ($firebase, FBURL) {
    var userRef = new Firebase(FBURL + 'user');
    var user = $firebase(userRef);
    var currentUser = null;

    var getUser = function() {
        return user;
    };

    var getCurrentUser = function() {
        return currentUser;
    };

    var setCurrentUser = function(user) {
        currentUser = user;
    };

    var getItemsForCurrentUser = function() {
        return user.$child(currentUser + '/items/');
    };

    var addItemforCurrentUser = function(itemRef) {
        var child = user.$child(currentUser + '/items/' + itemRef.name());
        child.$set(true);
    };

    var removeItemForCurrentUser = function(itemId) {
        user.$remove(currentUser + '/items/' + itemId);
    };

    return {
        getUser: getUser,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
        getItemsForCurrentUser: getItemsForCurrentUser,
        addItemforCurrentUser: addItemforCurrentUser,
        removeItemForCurrentUser: removeItemForCurrentUser
    }
}]);

app.factory('ItemsService', ['$firebase', 'FBURL', 'UsersService', function ($firebase, FBURL, UsersService) {
    var itemsRef = new Firebase(FBURL + 'items');
    var items = $firebase(itemsRef);

    var getItems = function() {
        return items;
    };

    var addItem = function(item) {
        items.$add(item).then(function(ref) {
            UsersService.addItemforCurrentUser(ref);
        })
    };

    var removeItem = function(itemId) {
        items.$remove(itemId).then(function() {
            UsersService.removeItemForCurrentUser(itemId);
        });
    };

    return {
        getItems: getItems,
        addItem: addItem,
        removeItem: removeItem
    }
}]);