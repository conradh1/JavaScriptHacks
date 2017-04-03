var formApp = angular.module('formApp', ['ui.router']);

formApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state({name: 'home',
	    url: '/home',
	   views: {
                '': { templateUrl: 'home.html',
		      controller: 'searchFormCtrl'
		    },
		'list': { controller: 'listPeople',
			   template: '<ul>'+
				      '<li ng-repeat="contact in contacts">'+
				      '<a>{{contact.name}}</a>'+
				      '</li>'+
				      '</ul>'
			  }
            }
    })

    .state({name: 'about',
	    url: '/about',
	    component: 'about'
    })


    .state({name: 'list',
	    url: '/list',
	    component: 'list',
	    resolve: {
	      people: function(ListProviderService) {
		return ListProviderService.getAllProviders();
	      }
	    }
    });

    $urlRouterProvider.otherwise('/home');
})


formApp.controller('listPeople', function($scope, $http) {
  //$scope.contacts = [{ name: 'Alice' }, { name: 'Bob' }];
   $scope.contact = null;
    $http({method: 'GET', url: 'data/providers.json'}).
        success(function(data, status, headers, config) {
            $scope.contacts=data;
        }).error(function(data, status, headers, config) {
    });

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


formApp.service('ListProviderService', function($http) {
  var service = {
    getAllProviders: function() {
      return $http.get('data/providers.json', { cache: true }).then(function(resp) {
        return resp.data;
      });
    },

    getPerson: function(id) {
      function personMatchesParam(person) {
        return person.id === id;
      }

      return service.getAllProviders().then(function (people) {
        return people.find(personMatchesParam)
      });
    }
  }

  return service;
});

formApp.component('list', {
  bindings: { people: '<' },

  template: '<div class="flex-h">' +
            '  <div class="people">' +
            '    <h3>Some people:</h3>' +
            '    <ul>' +
            '      <li ng-repeat="person in $ctrl.people">' +
            '        <a ui-sref-active="active" ui-sref="people.person({ personId: person.id })">' +
            '          {{person.name}}' +
            '        </a>' +
            '      </li>' +
            '    </ul>' +
            '  </div>' +
            '  <ui-view></ui-view>' +
            '</div>'
});



