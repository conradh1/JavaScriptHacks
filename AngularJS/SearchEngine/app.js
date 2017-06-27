var searchApp = angular.module('searchApp', ['ui.router']);

searchApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

   .state('search', {
				url: '/search',
				templateUrl: 'search.html',
                controller: 'searchCtrl',
                reloadOnSearch: false
            })

    $urlRouterProvider.otherwise('/');
})

searchApp.controller('searchCtrl', function($scope, $state, $stateParams) {

	console.log("Called controller!");

    // function to process the form
    $scope.submit = function() {

		console.log("Called submit!");
        $scope.showKeywords = function() {
			return "Results: " + $scope.keywords;
		};
    };
});


