/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('homeCtrl', ['$log', '$scope', '$state',
    function ($log, $scope, $state) {

      var mv = this;
      mv.toggleRemember = _toggleRemember;
      $scope.goToCarParkList = _goToCarParkList;
      $scope.rememberRegNumber = false;

      function _toggleRemember () {
        $scope.rememberRegNumber = !$scope.rememberRegNumber;
      }

      function _goToCarParkList () {
        $state.go('park-list', {
          'employeeNumber': $scope.employeeNumber
        });
      }

    }]);

})(angular);
