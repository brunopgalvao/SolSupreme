(function () {

  'use strict';

  require('angular');
  require('angular-route');
  require('angular-animate');
  var mainCtrl = require('./controllers/mainctrl');

  angular.module('SolSupreme', ['ngRoute', 'ngAnimate'])

  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/blog.html",
          controller: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }
  ])

  //Load controller
  .controller('MainController', ['$scope', mainCtrl]);

}());