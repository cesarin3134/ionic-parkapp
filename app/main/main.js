'use strict';

/*
 * Here's the calling order:
 app.config()
 app.run()
 directive's compile functions (if they are found in the dom)
 app.controller()
 directive's link functions (again, if found)
 */

angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngResource',
  'ui.calendar',
  'ngMessages',
  'LocalForageModule',
  'btford.socket-io',
  // TODO: load other modules selected during generation
]).run(function ($ionicPlatform, $ionicLoading, $rootScope, $timeout) {

  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      window.cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }
  });

  $rootScope.$on('loading:show', function () {
    $ionicLoading.show({
      'template': '<ion-spinner></ion-spinner>'
    });
  });

  $rootScope.$on('loading:hide', function () {
    $ionicLoading.hide();
  });

  $rootScope.$on('$stateChangeStart', function () {
    console.log('loading');
    $rootScope.$broadcast('loading:show');
  });

  $rootScope.$on('$stateChangeSuccess', function () {
    console.log('done');
    $timeout(function () {
      $rootScope.$broadcast('loading:hide');
    }, 1000);

  });
}).config(['$stateProvider', '$urlRouterProvider', '$localForageProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $localForageProvider, $httpProvider) {

  //initialize get if not there
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }

  //disable IE ajax request caching
  $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
  // extra
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


  $localForageProvider.config({
    driver: 'localStorageWrapper',
    name: 'parkCache'
  });
  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('home', {
      url: '/home',
      templateUrl: 'main/templates/home.view.html',
      controller: 'homeCtrl as ctrl'
    }).state('park-list', {
      cache: false,
      url: '/park-list',
      params: {
        'dataUser': null
      },
      templateUrl: 'main/templates/carParkList.view.html',
      controller: 'carParkListCtrl as ctrl'
    });
}]);
