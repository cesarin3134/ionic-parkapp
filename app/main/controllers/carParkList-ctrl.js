/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('carParkListCtrl', ['$log', '$scope', '$ionicModal', 'ParkListSrv', '$stateParams',
    function ($log, $scope, $ionicModal, ParkListSrv, $stateParams) {

      if ($stateParams && $stateParams.employeeNumber) {
        $scope.employeeNumber = $stateParams.employeeNumber;
      }

      var mv = this;
      mv.showCalendar = _showCalendar;
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

      $scope.$on('$ionicView.afterEnter', function () {
        ParkListSrv.request.query({'id': $scope.employeeNumber}, function (parkList) {
          $scope.parkingList = parkList;
        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
          $scope.parkingList = ParkListSrv.getParkingList();
        });
      });

    }]);

})(angular);
