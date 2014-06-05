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

			return {
				getAllWods: getAllWods,
				newWod: newWod,
				removeWod: removeWod
			}

	}]);