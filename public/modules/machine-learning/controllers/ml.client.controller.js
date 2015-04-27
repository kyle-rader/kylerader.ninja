'use strict';

angular.module('machine-learning').controller('MlController', ['$scope',
	function($scope) {
		nv.addGraph(function() {
		  var chart = nv.models.scatterChart()
		                .showDistX(false)    //showDist, when true, will display those little distribution lines on the axis.
		                .showDistY(false)
		                .transitionDuration(350)
										.height(800)
		                .color(d3.scale.category10().range());

		  //Configure how the tooltip looks.
		  chart.tooltipContent(function(key) {
		      return '<h4>&nbsp;' + key + '&nbsp;</h4>';
		  });

		  //Axis settings
		  chart.xAxis.tickFormat(d3.format('.02f'));
		  chart.yAxis.tickFormat(d3.format('.02f'));

		  //We want to show shapes other than circles.
		  chart.scatter.onlyCircles(false);

		  var myData = randomData(4,10);
			console.log(myData);
		  d3.select('#chart svg')
		      .datum(myData)
		      .call(chart);

		  nv.utils.windowResize(chart.update);

		  return chart;
		});

		/**************************************
		 * Simple test data generator
		 */
		function randomData(groups, points) { //# groups,# points per group
		  var data = [],
	      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
	      random = d3.random.normal();

		  	for (var i = 0; i < groups; i++) {
		    data.push({
		      key: 'Group ' + i,
		      values: []
		    });

		    for (var j = 0; j < points; j++) {
					var size = Math.random();
		      data[i].values.push({
		        x: random()
		      , y: random() * 7
		      , size: 1.0 + Math.random() * .01
		      //, shape: 'circle'
		      });
		    }
		  }

		  return data;
		}


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

			$scope.loading = false;
			console.log(rawData);
			$scope.exampleData = [
	    {
	        "key": "Series 1",
	        "values": rawData
	    }];

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
