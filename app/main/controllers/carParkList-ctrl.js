/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('carParkListCtrl', ['$log', '$scope', '$ionicModal', 'ParkListSrv', '$stateParams',
    function ($log, $scope, $ionicModal, ParkListSrv, $stateParams) {

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
          dayClick: _dateSelected
        }
      };

      function _getMongoDate (date, timeStamp) {

        var _currentDate = null;
        var _year = null;
        var _month = null;
        var _day = null;

        if (!date) {
          _currentDate = new Date();
          _year = _currentDate.getFullYear();
          _month = _currentDate.getMonth() + 1;
          _day = _currentDate.getDate();

        } else {
          _currentDate = new Date(date);
          _year = _currentDate.getFullYear();
          _month = _currentDate.getMonth() + 1;
          _day = _currentDate.getDate();

        }

        if (!timeStamp) {
          return new Date(_year + '-' + _month + '-' + _day);
        } else {
          console.log('List Date ', new Date(new Date(_year + '-' + _month + '-' + _day).getTime()));
          return new Date(_year + '-' + _month + '-' + _day).getTime();
        }


      }

      function _changeStatus (item) {

        $scope.item = item;

        var _allocationObj = {
          userName: $scope.userName,
          employeeCode: $scope.employeeCode,
          date: _getMongoDate()
        };

        ParkListSrv.request.updateAllocation({parkNumber: $scope.item._id}, _allocationObj, function (park, error) {
          if (!error) {
            console.log('updated');
            /*console.log('locked', $scope.item);*/
          }
          _loadParkList($scope.employeeCode, _getMongoDate(null, true));
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
        $scope.carParkFilterDay = window.moment(date).format('DD/MM/YYYY');
        $scope.selectedDate = null
        _loadParkList($scope.employeeCode, _getMongoDate(null, true));
        $scope.calendarModal.hide();
      }

      function _setLocked (parkList) {

        var newParkList = [];

        angular.forEach(parkList, function (park, ix) {

          if (park.allocations) {
            if (park.allocations.length !== 0) {

              angular.forEach(park.allocations, function (value, jx) {

                if (jx === 'date') {
                  if (value === _getMongoDate().toISOString()) {
                    park.locked = true;
                  } else {
                    park.locked = false;
                  }
                }
              });

            } else {
              park.locked = false;
            }
          } else {
            park.locked = false;
          }
          newParkList.push(park);
        });
        return newParkList;
      }

      function _loadParkList (employeeCode, filterDate) {
        ParkListSrv.request.query({
          employeeCode: employeeCode,
          allocationDate: filterDate
        }, function (parkList) {
          //$scope.parkingList = _checkParkStatus(parkList);
          $scope.parkingList = _setLocked(parkList);

        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
          // $scope.parkingList = ParkListSrv.getParkingList();
        });
      }

      $scope.$on('$ionicView.afterEnter', function () {
        _loadParkList($scope.employeeCode, _getMongoDate(null, true));

      });

    }]);

})(angular);
