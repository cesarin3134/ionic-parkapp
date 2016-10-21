/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('homeCtrl', ['$log', '$scope', '$state', 'HomeSrv',
    function ($log, $scope, $state, HomeSrv) {

      var mv = this;
      mv.toggleRemember = _toggleRemember;
      mv._setValid = _setValid;
      $scope.goToCarParkList = _goToCarParkList;
      $scope.rememberRegNumber = false;
      $scope.showError =  false;


      function _toggleRemember () {
        $scope.rememberRegNumber = !$scope.rememberRegNumber;
      }

      function _setValid () {
        $scope.showError = false;
      }

      function _goToCarParkList (employeeNumber) {

        HomeSrv.request.get({id: employeeNumber}, function (user) {

          if (user) {
            if (!user.errorMessage) {
              $scope.dataUser = user;
              $state.go('park-list', {dataUser: $scope.dataUser});
            } else {
              $scope.showError = user.errorMessage;
              $scope.errorDescription = user.errorDescription;

            }
          }

        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
        });


      }

      $scope.$on('$ionicView.afterEnter', function () {

      });

    }]);

})(angular);
