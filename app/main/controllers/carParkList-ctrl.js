/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('carParkListCtrl', ['$log', '$scope', 'parkListSrv',
    function ($log, $scope, parkListSrv) {
      $scope.parkingList = parkListSrv.getParkingList();
    }]);

})(angular);
