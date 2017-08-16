var MainController = function ($scope, $http, $interval, $log) {
  var onUserComplete = function (response) {
    $scope.user = response.data
    $http.get($scope.user.repos_url)
      .then(onRepos, onError)
  }
  var onRepos = function (response) {
    $scope.repos = response.data
  }
  var onError = function (reason) {
    $scope.error = 'Could not fetch the data'
  }
  $scope.username = 'angular'
  $scope.title = 'Github Viewer'
  $scope.search = function (username) { 
    $log.info('Searching for ' + username)
    $http.get('https://api.github.com/users/' + username)
      .then(onUserComplete, onError)
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