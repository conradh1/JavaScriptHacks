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
          contorller: 'resultsCtrl',
          templateUrl: 'results.html'
    })


    $urlRouterProvider.otherwise('/');
})

searchApp.controller('searchCtrl', function($scope, $state, $stateParams) {

	console.log("Called controller!");

    // function to process the form
    $scope.submit = function() {

        console.log("Called submit!");
        //$state.go('results', {keywords: $scope.keywords});
        $state.go('.', {keywords: $scope.keywords});
        $scope.showKeywords = function() {
			return "Results: " + $scope.keywords;
		};
    };
});


