'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('githubViewer', [])

app.controller('MainController', ['$scope', '$http', MainController])