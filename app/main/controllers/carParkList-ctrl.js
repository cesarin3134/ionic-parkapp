/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('carParkListCtrl', ['$log', '$scope', '$ionicModal', 'parkListSrv', '$stateParams',
    function ($log, $scope, $ionicModal, parkListSrv, $stateParams) {

      var mv = this;
      if ($stateParams && $stateParams.employeeNumber) {
        $scope.employeeNumber = $stateParams.employeeNumber;
      }
      mv.showCalendar = _showCalendar;

      $scope.parkingList = parkListSrv.getParkingList();

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


    }]);

})(angular);
