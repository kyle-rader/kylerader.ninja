'use strict';

module.exports = {
	app: {
		title: 'Kyle Rader\'s playground',
		description: 'A blog and web development playground.',
		keywords: 'MongoDB, Express, SWIG, AngularJS, NodeJS, MEAN.js, Node.js, WebDev, KyleRader'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [ ],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/d3/d3.js',
				'public/lib/nvd3/nv.d3.js',
				'public/lib/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js'
			]
		},
		css: [
			'public/dist/application.min.css',
			'public/lib/nvd3/nv.d3.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
