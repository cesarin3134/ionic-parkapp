/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('homeCtrl', ['$log', '$scope',
    function ($log, $scope) {
      var mv = this;
      mv.toggleRemember = _toggleRemember;
      $scope.rememberRegNumber = false;

      function _toggleRemember () {
        $scope.rememberRegNumber = !$scope.rememberRegNumber;
      }

    }]);

})(angular);
