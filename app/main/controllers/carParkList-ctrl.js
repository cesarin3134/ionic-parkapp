/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('carParkListCtrl', ['$log', '$rootScope', '$scope', '$ionicModal',
    'ParkListSrv', '$timeout', 'Socket', '$stateParams', '$state', '$ionicLoading',
    function ($log, $rootScope, $scope, $ionicModal, ParkListSrv, $timeout, Socket, $stateParams, $state, $ionicLoading) {
      console.log($ionicLoading);
      if ($stateParams && $stateParams.dataUser) {
        $scope.employeeCode = $stateParams.dataUser.employeeCode;
        $scope.userName = $stateParams.dataUser.userName;
      } else {
        $state.go('home');
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

        $scope.selectedDate = _getMongoDate(_selectedDate, true);

        ParkListSrv.request.updateAllocation({parkNumber: $scope.item._id}, _allocationObj)
          .$promise
          .then(function (parks) {
            _setParkList(parks, $scope.selectedDate);
            Socket.emit('allocated', $scope.selectedDate);
          });
      }

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
        var _parkList;
        var keepGoing = true;

        if (parkList.length) {
          _parkList = parkList;
        } else {
          _parkList = [parkList];
        }

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

      function _requestParkList (employeeCode, filterDate) {
        return ParkListSrv.request.query(
          {
            employeeCode: employeeCode,
            allocationDate: filterDate
          }).$promise;
      }

      function _setParkList (parks, filterDate) {
        if (parks) {
          $scope.parkingList = _setLocked(parks, _getMongoDate(filterDate).toISOString());
        }
      }

      function _loadParkList (employeeCode, filterDate) {
        _requestParkList(employeeCode, filterDate).then(function (parksList) {
          _setParkList(parksList, filterDate);
        });
      }

      function _reloadParkList () {
        _loadParkList($scope.employeeCode, $scope.selectedDate);
      }

      $scope.$on('$ionicView.afterEnter', function () {

        $scope.selectedDate = _getMongoDate(null, true);

        _loadParkList($scope.employeeCode, _getMongoDate(null, true));

      });

      Socket.on('reloadList', function (data) {
        if (data === $scope.selectedDate) {
          _reloadParkList();
        }
      });

    }]);

})(angular);
