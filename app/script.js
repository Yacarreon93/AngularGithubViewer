(function () {

  var app = angular.module('githubViewer')

  var MainController = function ($scope, $interval, $location) {

    $scope.title = 'Github Viewer'
    $scope.username = 'angular'
    $scope.countdown = 5

    $scope.search = function (username) {
      if (countdownInterval) {
        $interval.cancel(countdownInterval)
        $scope.countdown = null
      }
      $location.path('/user/' + username)
    }

    var decrementCountdown = function () {
      $scope.countdown -= 1
      if ($scope.countdown < 1) {
        $scope.search($scope.username)
      }
    }

    var startCountdown = function () {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown)
    }

    startCountdown()

  }

  app.controller('MainController', MainController)

}())