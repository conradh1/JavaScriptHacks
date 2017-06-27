(function() {
  var wikiView = angular.module('wikiView', []);

  wikiView.controller('wikiController', function($scope, $http) {

    var onArticleReceived = function(response) {
      $scope.articles = response;
    }

    var onArticleError = function(reason) {
      $scope.error = reason;
    }

    $scope.queryText = "";

    $scope.makeUrl = function(searchTerm) {
      console.log("lkj");
      return 'https://en.wikipedia.org/w/api.php?action=query&format=json&maxlag=10&prop=&list=&meta=&titles=' + searchTerm;
    }

    $scope.searchArticle = function(url) {
      $http.get(url)
        .then(onArticleReceived, onArticleError);
    }

  });
}());