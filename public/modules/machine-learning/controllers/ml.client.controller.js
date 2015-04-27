'use strict';

angular.module('machine-learning').controller('MlController', ['$scope',
	function($scope) {

		$scope.buildData = function() {
			$scope.loading = undefined;
			$scope.error = undefined;

			if ($scope.rawData === undefined || $scope.rawData === '') {
				$scope.error = "I need dat raw data, yo.";
				return;
			} else if ($scope.clusterData === undefined || $scope.clusterData === '') {
				$scope.error = "I need dat cluster data, yo.";
				return;
			}

			$scope.loading = true;

			var rawData = parseData($scope, $scope.rawData);
			var clusterData = parseData($scope, $scope.clusterData);
			if (rawData.length !== clusterData[0].length) {
				$scope.error = "N in the raw data does not match N in the cluster data.";
				$scope.loading = false;
				return;
			}

			$scope.loading = true;
		};

		function parseData($scope, inputString) {
			var rows = inputString.trim().split(/\n/g);
			var data = [];
			var oldRowLength = null;

			for(var i = 0; i < rows.length; i++) {
				var rowData = rows[i].trim().split(/\s+/g);
				var intRowData = [];
				var rowLength = rowData.length;
				if (i === 0) oldRowLength = rowLength;
				if (oldRowLength !== rowLength) {
					$scope.error = "Too many items found in a row.";
					return null;
				} else {
					oldRowLength = rowLength;
				}

				/* Get numbers for the row */
				for(var j = 0; j < rowLength; j++) {
					var num = parseFloat(rowData[j]);
					if (isNaN(num)) {
						$scope.error = "Only numbers yo.";
						return null;
					}
					intRowData.push(num);
				}

				data.push(intRowData);
			}
			return data;
		}
	}
]);
