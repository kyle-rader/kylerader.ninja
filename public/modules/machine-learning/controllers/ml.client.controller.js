'use strict';

angular.module('machine-learning').controller('MlController', ['$scope',
	function($scope) {

		$scope.nextCluster = function() {
			$scope.clusterStep += 1;
			refresh();
		}

		$scope.prevCluster = function() {
			$scope.clusterStep -= 1;
			refresh();
		}

		var refresh = function() {

			if ($scope.dataSets === undefined || $scope.clusterStep === undefined) return;

			nv.addGraph(function() {
			  var chart = nv.models.scatterChart()
			                .showDistX(false)    //showDist, when true, will display those little distribution lines on the axis.
			                .showDistY(false)
			                .transitionDuration(500)
											.height(600)
			                .color(d3.scale.category10().range())
											.size(2).sizeRange([50,50]);

			  //Configure how the tooltip looks.
			  chart.tooltipContent(function(key) {
			      return '<h4>&nbsp;' + key + '&nbsp;</h4>';
			  });

			  //Axis settings
			  chart.xAxis.tickFormat(d3.format('.02f'));
			  chart.yAxis.tickFormat(d3.format('.02f'));

			  //We want to show shapes other than circles.
			  chart.scatter.onlyCircles(true);
				var step = $scope.clusterStep;
			  d3.select('#chart svg')
			      .datum($scope.dataSets[step])
			      .call(chart);

			  nv.utils.windowResize(chart.update);

			  return chart;
			});
		};

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

			var rawData = parseData($scope, $scope.rawData.data);
			var clusterData = parseData($scope, $scope.clusterData.data);

			if (rawData.length !== clusterData[0].length) {
				$scope.error = "N in the raw data does not match N in the cluster data.";
				$scope.loading = false;
				$scope.rawData = undefined;
				$scope.clusterData = undefined;
				return;
			}

			var dataSets = [];

			for (var cluster = 0; cluster < clusterData.length; cluster++) {
				dataSets[cluster] = [];
				for (var i = 0; i < clusterData[cluster].length; i++) {
					if (dataSets[cluster][clusterData[cluster][i]] === undefined) {
						dataSets[cluster][clusterData[cluster][i]] = {
							key: 'Group ' + clusterData[cluster][i],
							values: []
						}
					}
					dataSets[cluster][clusterData[cluster][i]].values.push({
						x: rawData[i][0],
						y: rawData[i][1],
						shape: 'circle'
					});
				}
			}
			$scope.loading = false;
			$scope.dataSets = dataSets;
			$scope.clusterStep = 0;
			refresh();
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
]).directive('appFilereader', function(
    $q
  ) {
    /*
    made by elmerbulthuis@gmail.com WTFPL licensed
    */
    var slice = Array.prototype.slice;

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        ngModel.$render = function() {}

        element.bind('change', function(e) {
          var element = e.target;
          if(!element.value) return;

          //element.disabled = true;
          $q.all(slice.call(element.files, 0).map(readFile))
            .then(function(values) {
              if (element.multiple) ngModel.$setViewValue(values);
              else ngModel.$setViewValue(values.length ? values[0] : null);
              element.value = null;
              element.disabled = false;
            });

          function readFile(file) {
            var deferred = $q.defer();

            var reader = new FileReader()
            reader.onload = function(e) {
              deferred.resolve({data: e.target.result, name: file.name});
            }
            reader.onerror = function(e) {
              deferred.reject(e);
            }
            reader.readAsText(file);

            return deferred.promise;
          }

        }); //change

      } //link

    }; //return

  }) //appFilereader
;
