'use strict';

//Setting up route
angular.module('machine-learning').config(['$stateProvider',
	function($stateProvider) {
		// Machine learning state routing
		$stateProvider.
		state('ml-kmeans', {
			url: '/ml-kmeans',
			templateUrl: 'modules/machine-learning/views/ml-kmeans.client.view.html'
		}).
		state('ml', {
			url: '/ml',
			templateUrl: 'modules/machine-learning/views/ml.client.view.html'
		});
	}
]);
