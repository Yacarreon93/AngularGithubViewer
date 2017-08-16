(function () {

  var app = angular.module('githubViewer')

  var UserController = function ($scope, github, $routeParams) {

    $scope.username = $routeParams.username
    $scope.repoSortOrder = '-stargazers_count'

    var onUserComplete = function (data) {
      $scope.user = data
      github.getRepos($scope.user).then(onRepos, onError)
    }

    var onRepos = function (data) {
      $scope.repos = data
    }

    var onError = function (reason) {
      $scope.error = 'Could not fetch the data'
    }

    github.getUser($scope.username).then(onUserComplete, onError)

  }

  app.controller('UserController', UserController)

}())