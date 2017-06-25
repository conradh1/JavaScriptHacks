var searchApp = angular.module('searchApp', ['ui.router']);

searchApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

   .state('search', {
				url: '/search',
				templateUrl: 'search.html',
                controller: 'searchCtrl',
                reloadOnSearch: false
            })

    $urlRouterProvider.otherwise('/search');
})

searchApp.controller('searchCtrl', function($scope, $state, $stateParams) {
    $scope.searchForm = {};

	console.log("hit controller");

    // function to process the form
    $scope.processSearchForm = function() {

        $scope.showKeywords = function() {
			return "Results: " + $scope.searchForm.keywords;
		};
    };
});


