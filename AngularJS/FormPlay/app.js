var formApp = angular.module('formApp', ['ui.router']);

formApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

   .state({name: 'home',
	    url: '/home',
	   views: {
                '': { templateUrl: 'home.html',
		      controller: 'searchFormCtrl'
		    },
		'experiences': { component: 'experiences' }
            },
	   resolve: {
	      experiences: function(ExperienceService) {
		return ExperienceService.getAllExperiences();
	      }
	    }

    })


   .state('search', {
                url: '/search?query',
		templateUrl: 'search.html',
                controller: 'SearchController as searchCtrl',
                reloadOnSearch: false
            })

    .state({name: 'about',
	    url: '/about',
	    component: 'about'
    })


    .state({name: 'experiences',
	    url: '/experiences',
	    component: 'experiences',
	    resolve: {
	      experiences: function(ExperienceService) {
		return ExperienceService.getAllExperiences();
	      }
	    }
    })

    .state({name: 'experience',
      url: '/experience/{experienceId}',
      component: 'experience',
      resolve: {
        experience: function(ExperienceService, $stateParams) {
          return ExperienceService.getPerson($stateParams.experienceId);
        }
      }

    })
    $urlRouterProvider.otherwise('/home');
})

formApp.controller('searchCtrl', function($scope, $state, $stateParams) {
    $scope.searchForm = {};

    $scope.search = function() {
      $stateParams.query = vm.query;
      //searchService.search(vm.query);
      $location.search('query', vm.query);
    };
    // function to process the form
    $scope.processSearchForm = function() {
        $scope.showKeywords = function() {
	  return "Results: " + $scope.searchForm.keywords;
	};
    };
});

formApp.controller('searchFormCtrl', function($scope, $state, $stateParams) {
    $scope.searchForm = {};

    // function to process the form
    $scope.processSearchForm = function() {
        $scope.showKeywords = function() {
	  return "Results: " + $scope.searchForm.keywords;
	};
    };
});


formApp.component('about', {
  template: "<h3>This is the about page</h3>"
});


formApp.service('ExperienceService', function($http) {
  var service = {
    getAllExperiences: function() {
      return $http.get('data/experiences.json', { cache: false }).then(function(resp) {
        return resp.data;
      });
    },

    getPerson: function(id) {
      function experienceMatchesParam(experience) {
        return experience.id === id;
      }

      return service.getAllExperiences().then(function (experiences) {
        return experiences.find(experienceMatchesParam)
      });
    }
  }

  return service;
});

formApp.component('experiences', {
  bindings: { experiences: '<' },

  template: '<div class="flex-h">' +
            '  <div class="experiences">' +
            '    <h3>Some experiences:</h3>' +
            '    <ul>' +
            '      <li ng-repeat="experience in $ctrl.experiences">' +
            '        <a ui-sref-active="active" ui-sref="experience({ experienceId: experience.id })">' +
            '          {{experience.name}}' +
            '        </a>' +
            '      </li>' +
            '    </ul>' +
            '  </div>' +
            '  <ui-view></ui-view>' +
            '</div>'
});

formApp.component('experience', {
  bindings: { experience: '<' },
  template: '<h3>A experience!</h3>' +

            '<div>Name: {{$ctrl.experience.name}}</div>' +
            '<div>Id: {{$ctrl.experience.id}}</div>' +
            '<div>Company: {{$ctrl.experience.company}}</div>' +
            '<div>Email: {{$ctrl.experience.email}}</div>' +
            '<div>Address: {{$ctrl.experience.address}}</div>' +

            '<button ui-sref="home">Close</button>'
});



