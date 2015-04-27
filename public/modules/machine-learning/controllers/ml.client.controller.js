'use strict';

angular.module('machine-learning').controller('MlController', ['$scope',
	function($scope) {

		$scope.buildData = function() {
			$scope.loading = false;
			$scope.error = undefined;
			if ($scope.rawData === undefined || $scope.rawData === '') {
				$scope.error = "I need dat raw data, yo.";
				return;
			} else if ($scope.clusterData === undefined || $scope.clusterData === '') {
				$scope.error = "I need dat cluster data, yo.";
				return;
			}

			$scope.loading = true;

			

		}

		$scope.parseData = function(inputString) {

		}
	}
]);
