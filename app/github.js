(function () {

  var github = function ($http) {

    var returnData = function (response) {
      return response.data
    }

    var getUser = function (username) {
      return $http.get('https://api.github.com/users/' + username)
                  .then(returnData)
    }

    var getRepos = function (user) {
      return $http.get(user.repos_url)
                  .then(returnData)
    }

    var getRepo = function (username, repoName) {
      var repo
      var url = 'https://api.github.com/repos/' + username + '/' + repoName
      return $http.get(url)
                  .then(function (response) {
                    repo = response.data
                    return $http.get(url + '/collaborators')
                  })
                  .then(function (response) {
                    console.log('asd' + response)
                    repo.collaborators = response.data
                    return repo
                  })
    }

    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepo: getRepo
    }

  }

  var module = angular.module('githubViewer')
  module.factory('github', github)

}())