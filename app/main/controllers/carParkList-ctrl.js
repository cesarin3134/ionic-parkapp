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

      function _changeStatus (item) {
        console.log(item.isFree);
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
        angular.forEach(parkList, function (item) {
          if (item.allocations.length > 0) {
            item.isFree = false;
          } else {
            item.isFree = true;
          }
          newList.push(item);
        });

        return newList;
      }


      $scope.$on('$ionicView.afterEnter', function () {
        ParkListSrv.request.query({
          employeeCode: $scope.employeeCode,
          allocationDate: new Date().getTime()
        }, function (parkList) {
          $scope.parkingList = _checkParkStatus(parkList);

          if ($scope.parkingList.length == 0) {
            ParkListSrv.request.query({'action': 'list', 'action2': 'toAllocate'}, function (parkList) {
              $scope.parkingList = _checkParkStatus(parkList);
            });
          }

        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
          $scope.parkingList = ParkListSrv.getParkingList();
        });
      });

    }]);

})(angular);
