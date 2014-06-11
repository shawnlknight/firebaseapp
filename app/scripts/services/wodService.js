angular.module('firebaseappApp')
	.factory('WodService',['$firebase', 'FBURL', function($firebase, FBURL) {
			var ref = new Firebase(FBURL);
			var wodItems = $firebase(ref);

			// crud methods

			var getAllWods = function() {
					return wodItems;
			};

			var newWod = function(wod) {
				wodItems.$add(wod);
			};

			var removeWod = function(id) {
				wodItems.$remove(id);
			};

			var updateWod = function(wod) {
				ref.update(wod);
			};

			var wodArray = function() {
				syncData('wodItems').$bind($scope, 'wodItems').then(function() {
				  var keys = $scope.wodItems.$getIndex();

				  // utilizing Angular's helpers
				  angular.forEach(keys, function(key) {
				     push(key, $scope.wodItems[key]);
				  });

				  // or as a for loop
				  // for(var i=0, len = keys.length; i < len; i++) {
				  //    console.log(keys[i], $scope.wodItems[keys[i]]);
				  // }
				});
			};

			var randomWod = function() {
				var i = 0;
				var rand = Math.floor(Math.random() * wodItems());
				wodItems.forEach(function(wodItems) {
				  if (i == rand) {
				    // picked random item, snapshot.val().
				  }
				  i++;
				});
				var workout = key[randomizer];
				console.log(key);

					return workout;
			};

			return {
				getAllWods: getAllWods,
				newWod: newWod,
				removeWod: removeWod,
				wodArray: wodArray,
				randomWod: randomWod
			}

	}]);