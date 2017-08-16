(function () {

  var app = angular.module('githubViewer')

  var RepoController = function ($scope, github, $routeParams) {

    $scope.username = $routeParams.username
    $scope.repoName = $routeParams.repoName
    $scope.collaboratorsSortOrder = '+login'

    var onComplete = function (data) {
      $scope.repo = data
    }

    var onError = function (reason) {
      $scope.error = 'Could not fetch the data: ' + reason.statusText
    }

    github.getRepo($scope.username, $scope.repoName)
      .then(onComplete, onError)

  }

  app.controller('RepoController', RepoController)

}())