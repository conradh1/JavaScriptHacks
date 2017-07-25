var searchApp = angular.module('searchApp', ['ui.router']);

searchApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

   .state('search', {
				url: '/search?keywords',
				templateUrl: 'search.html',
                controller: 'searchCtrl',
                params: {
                    keywords: {
                        value: '',
                        squash: true
                    }
                },
                reloadOnSearch: false
    })
   
   .state({name: 'results',
	    url: '/results/keywords={keywords}',
          templateUrl: 'results.html',
		  controller: 'resultsCtrl'
    })


    $urlRouterProvider.otherwise('/search');
})

searchApp.controller('searchCtrl', function($scope, $state, $stateParams) {

	console.log("Called Search controller!");

    // function to process the form
    $scope.submit = function() {
        $state.go('results', {keywords: $scope.keywords});
        //$state.go('.', {keywords: $scope.keywords});
    };
});


searchApp.controller('resultsCtrl', function($scope, $state, $stateParams) {

	console.log("Called Results controller!");

    $scope.keywords = $stateParams.keywords;
	$scope.showKeywords = function() {
		console.log("Called Show Keywords");
		return "Results: " + $scope.keywords;
	};
});
