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

/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular) {
  angular.module('main').constant('PARK_LIST_CONST', {
    'RELATIVE_URL': '/parks/'
  }).factory('ParkListSrv', ['$resource', 'Config', 'PARK_LIST_CONST', function ($resource, Config, PARK_LIST_CONST) {

    function _getParkingList () {

      var parkList = [];
      var today = new Date();
      var tomorrow = new Date();

      for (var i = 0; i < 20; i++) {

        parkList.push({
            'id': {'parkNumber': i, 'location': 'Bisceglie'},
            'allocations': [{
              'user': 'Mario Rossi', 'employeeNumber': Math.random().toString(36).slice(3, 8).toUpperCase(),
              'date': new Date(tomorrow.setDate(today.getDate() + i)).toISOString()
            }]
          }
        );
      }
      return parkList;
    }

    return {
      getParkingList: _getParkingList,
      request: $resource(Config.ENV.SERVER_API + PARK_LIST_CONST.RELATIVE_URL + ':employeeCode/:allocationDate', {
        employeeCode: '@employeeCode',
        allocationDate: '@allocationDate'

      }, {
        'updateAllocation': {
          url: Config.ENV.SERVER_API + PARK_LIST_CONST.RELATIVE_URL + 'update/:parkNumber',
          method: 'PUT',
          params: {
            employeeCode: null
          }
        }
      })
    };

  }]);
})(angular);

/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular, window) {
  angular.module('main').factory('Socket', ['socketFactory', 'Config', function (socketFactory, Config) {

    var myIoSocket = window.io.connect(Config.ENV.SERVER_API);

    var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
  }]);
})(angular, window);

/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular) {
  angular.module('main').constant('HOME_CONST', {
    'RELATIVE_URL': '/employee/'
  }).factory('HomeSrv', ['$resource', 'Config', 'HOME_CONST', function ($resource, Config, HOME_CONST) {

    return {
      request: $resource(Config.ENV.SERVER_API + HOME_CONST.RELATIVE_URL + ':action/:id', {
          action: '@action'
        },
        {
          'get': {
            method: 'GET'
          }
        })
    };

  }]);
})(angular);

/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('homeCtrl', ['$log', '$rootScope', '$scope', '$state', 'HomeSrv', '$localForage',
    function ($log, $rootScope, $scope, $state, HomeSrv, $localForage) {

      var mv = this;
      mv.toggleRemember = _toggleRemember;
      mv._setValid = _setValid;
      mv.goToCarParkList = _goToCarParkList;
      $scope.rememberRegNumber = false;
      $scope.showError = false;
      $scope.homeForm = {};


      var employeeCached = $localForage.getItem('employeeCode');

      employeeCached.then(function (data) {
        if (!data) {
          $scope.rememberRegNumber = false;
          $scope.homeForm.employeeCode = null;
        } else {
          $scope.rememberRegNumber = true;
          $scope.homeForm.employeeCode = data;
        }
      });

      function _storeEmployeeCode () {
        $localForage.setItem('employeeCode', $scope.homeForm.employeeCode).then(function (data) {
          console.log('added to persistent storage', data);
        });
      }

      function _removeEmployeeCode () {
        $localForage.removeItem('employeeCode');
      }

      function _toggleRemember () {
        $scope.rememberRegNumber = !$scope.rememberRegNumber;
        _setEmployeeCode($scope.rememberRegNumber);

      }

      function _setEmployeeCode (remember) {
        if (remember) {
          _storeEmployeeCode();
        } else {
          _removeEmployeeCode();
        }
      }

      function _setValid () {
        $scope.showError = false;
      }

      function _goToCarParkList (employeeCode) {

        $rootScope.$broadcast('loading:show');

        if ($scope.rememberRegNumber) {
          _storeEmployeeCode();
        }

        HomeSrv.request.get({id: employeeCode}, function (user) {

          if (user) {

            if (!user.errorMessage) {
              $scope.dataUser = user;
              $state.go('park-list', {dataUser: $scope.dataUser});
            } else {
              $scope.showError = user.errorMessage;
              $scope.errorDescription = user.errorDescription;

            }
          }

        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
        });


      }

      $scope.$on('$ionicView.afterEnter', function () {

      });

    }]);

})(angular);

/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('carParkListCtrl', ['$log', '$rootScope', '$scope', '$ionicModal',
    'ParkListSrv', '$timeout', 'Socket', '$stateParams',
    function ($log, $rootScope, $scope, $ionicModal, ParkListSrv, $timeout, Socket, $stateParams) {

      if ($stateParams && $stateParams.dataUser) {
        $scope.employeeCode = $stateParams.dataUser.employeeCode;
        $scope.userName = $stateParams.dataUser.userName;
      }

      var mv = this;
      mv.showCalendar = _showCalendar;
      mv.changeStatus = _changeStatus;
      $scope.parkingList = [];
      $scope.eventSources = [];
      $scope.uiConfig = {
        calendar: {
          height: 450,
          editable: true,
          disablePastDays: false,
          header: {
            left: '',
            right: 'today prev,next'
          },
          dayClick: _dateSelected,
          start: new Date()
        }
      };

      function _getMongoDate (date, timeStamp) {

        var _currentDate = null;

        if (!date) {
          _currentDate = new Date();
        } else {
          _currentDate = new Date(date);
        }

        _currentDate.setHours(12);
        _currentDate.setMinutes(0);
        _currentDate.setSeconds(0);
        _currentDate.setMilliseconds(0);

        if (!timeStamp) {

          return _currentDate;

        } else {

          return _currentDate.getTime();

        }
      }

      function _changeStatus (item) {

        $rootScope.$broadcast('loading:show');

        $scope.item = item;

        var _selectedDate = null;

        if ($scope.selectedDate) {

          _selectedDate = _getMongoDate($scope.selectedDate);

        } else {

          _selectedDate = _getMongoDate();

        }

        var _allocationObj = {
          userName: $scope.userName,
          employeeCode: $scope.employeeCode,
          date: _selectedDate
        };

        var data = {
         employeeCode: $scope.employeeCode,
         _date: _getMongoDate(_selectedDate, true)
         };

        Socket.emit('allocated', data);


        ParkListSrv.request.updateAllocation({parkNumber: $scope.item._id}, _allocationObj).$promise.then(function () {

           _loadParkList($scope.employeeCode, _getMongoDate(_selectedDate, true));

        });
      }

      Socket.on('loadList', function (data) {
        _loadParkList($scope.employeeCode, _getMongoDate(data._date, true));
      });

      function _showCalendar () {
        $ionicModal.fromTemplateUrl('main/templates/calendar-modal.html', {
          scope: $scope
        }).then(function (modal) {
          $scope.calendarModal = modal;
          $scope.calendarModal.show();
        });
      }

      function _dateSelected (date) {

        var calendarDateSelected = window.moment(date).format();

        var currentDate = window.moment(new Date()).hours(0).minutes(0).seconds(0).utc().format();

        if (window.moment(calendarDateSelected).isBefore(currentDate)) {
          return;
        }

        $scope.carParkFilterDay = window.moment(date).format('DD/MM/YYYY');

        $scope.selectedDate = _getMongoDate(date, true);

        _loadParkList($scope.employeeCode, $scope.selectedDate);

        $scope.calendarModal.hide();
      }

      function _setLocked (parkList, filterDate) {

        var newParkList = [];

        var _parkList = parkList;

        var keepGoing = true;

        angular.forEach(_parkList, function (park) {

          if (park.allocations.length === 0) {

            park.locked = false;

          } else if (park.allocations.length > 0) {

            angular.forEach(park.allocations, function (value) {

              if (keepGoing) {

                if (value.date === filterDate) {

                  park.locked = true;

                  keepGoing = false;

                } else {

                  park.locked = false;

                }
              }
            });

          }
          newParkList.push(park);
        });
        return newParkList;
      }

      function _loadParkList (employeeCode, filterDate) {
        $rootScope.$broadcast('loading:show');

        ParkListSrv.request.query(
          {
            employeeCode: $scope.employeeCode,
            allocationDate: filterDate
          },
          function (parkList) {

            $scope.parkingList = _setLocked(parkList, _getMongoDate(filterDate).toISOString());

            $rootScope.$broadcast('loading:hide');

          }, function (err) {

            $log.log('Using stubs data because you got request error :', err);

          });
      }

      $scope.$on('$ionicView.afterEnter', function () {

        _loadParkList($scope.employeeCode, _getMongoDate(null, true));

      });

    }]);

})(angular);

'use strict';
angular.module('main')
  .constant('Config', {

    // gulp environment: injects environment vars
    ENV: {
      /*inject-env*/

      'SERVER_URL': 'http://192.168.1.69',
    'SERVER_API': 'http://192.168.1.185:3000'

      /*endinject*/
    },

    // gulp build-vars: injects build vars
    BUILD: {
      /*inject-build*/
      /*endinject*/
    }

  });

'use strict';
angular.module('carpark', [
  // load your modules here
  'main', // starting with the main module
]).config(['$ionicConfigProvider', function () {
  //$ionicConfigProvider.navBar.alignTitle('center');
  //$ionicConfigProvider.views.transition('none');
}]);
