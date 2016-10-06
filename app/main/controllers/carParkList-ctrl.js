/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('carParkListCtrl', ['$log', '$scope', '$ionicModal', 'parkListSrv',
    function ($log, $scope, $ionicModal, parkListSrv) {

      var mv = this;
      mv.showCalendar = _showCalendar;
      $scope.parkingList = parkListSrv.getParkingList();



      function _showCalendar () {

        $ionicModal.fromTemplateUrl('main/templates/calendar-modal.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.calendarModal = modal;
          $scope.calendarModal.show();

        });
      }
    }]);

})(angular);
