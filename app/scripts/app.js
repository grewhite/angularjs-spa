'use strict';


// PRODUCTION
const CONTENT_URL = '/data/data.json';
const BASE_IMG_URL = '/images/';
const CONTACT_SUBMIT_URL = '/confirmation';

const DATALAYER_EVENT = 'definedEvent';
const DATALAYER_EVENT_CATEGORY = 'Analytics Category';

const SPA = angular.module('SPA', ['ngCookies','ngResource','ngSanitize', 'ngRoute']);

SPA.config(function ($routeProvider, $locationProvider, $provide) {

    $routeProvider
      .when('/', {
            templateUrl: 'views/main.html'
       })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/contact/:contractor', {
        templateUrl: 'views/contact.html'
      })
      .when('/confirmation', {
        templateUrl: 'views/thanks.html'
      })
      .when('/:contractors', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activeSubPage: ':contractors'
      })
      .otherwise({
        redirectTo: '/'
      });
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');
  });



