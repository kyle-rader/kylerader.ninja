'use strict';

//Setting up route
angular.module('machine-learning').config(['$stateProvider',
	function($stateProvider) {
		// Machine learning state routing
		$stateProvider.
		state('ml', {
			url: '/ml',
			templateUrl: 'modules/machine-learning/views/ml.client.view.html'
		});
	}
]);