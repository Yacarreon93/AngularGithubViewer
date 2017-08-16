var MainController = function (
  $scope, github, $interval, 
  $log, $anchorScroll, $location) {

  var onUserComplete = function (data) {
    $scope.user = data
    github.getRepos($scope.user).then(onRepos, onError)
  }

  var onRepos = function (data) {
    $scope.repos = data
    $location.hash("userDetails")
    $anchorScroll()
  }

  var onError = function (reason) {
    $scope.error = 'Could not fetch the data'
  }

  $scope.username = 'angular'
  $scope.title = 'Github Viewer'

  $scope.search = function (username) { 
    $log.info('Searching for ' + username)
    github.getUser(username).then(onUserComplete, onError)
    if (countdownInterval) {
      $interval.cancel(countdownInterval)
      $scope.countdown = null
    }
  }

  // $scope.search($scope.username)
  $scope.repoSortOrder = '-stargazers_count'
  $scope.countdown = 5

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