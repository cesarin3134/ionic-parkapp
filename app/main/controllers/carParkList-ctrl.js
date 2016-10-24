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

      function _getCurrentDate () {
        var _currentDate = new Date();
        var _year = _currentDate.getFullYear();
        var _month = _currentDate.getMonth() + 1;
        var _day = _currentDate.getDate();

        return new Date(_year + "-" + _month + "-" + _day);
      }

      function _changeStatus (item) {

        $scope.item = item;

        var _allocationObj = {
          "userName": $scope.userName,
          "employeeCode": $scope.employeeCode,
          "date": _getCurrentDate()
        };

        ParkListSrv.request.updateAllocation({"parkNumber": $scope.item._id}, _allocationObj, function (park, error) {
          if (!error) {
            $scope.item.locked = park.locked;
            console.log('locked', $scope.item.locked);
          }
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
        $scope.calendarModal.hide();
      }

      function _checkParkStatus (parkList) {


        var newList = [];
        var currentDate = _getCurrentDate();
        var park;
        var allocation;

        if (parkList.length > 0) {
          for (var i = 0; i < parkList.length; i++) {
            park = parkList[i];

            if (park.allocations) {
              if (park.allocations.constructor !== Array) {
                park.allocations = [park.allocations];
              }
            }

            if (park.allocations.length > 0) {
              for (var j = 0; j < park.allocations.length; j++) {
                allocation = park.allocations[j];
                if (allocation.date === currentDate.toISOString()) {
                  park.locked = true;
                } else {
                  park.locked = false;
                }
              }
            } else {
              park.locked = false;
            }
            newList.push(park);
          }

        }

        return newList;
      }


      $scope.$on('$ionicView.afterEnter', function () {
        ParkListSrv.request.query({
          employeeCode: $scope.employeeCode,
          allocationDate: new Date().getTime()
        }, function (parkList) {
          //$scope.parkingList = _checkParkStatus(parkList);
          $scope.parkingList = parkList;

        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
          $scope.parkingList = ParkListSrv.getParkingList();
        });
      });

    }]);

})(angular);
