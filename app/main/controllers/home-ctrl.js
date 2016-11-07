/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('homeCtrl', ['$log', '$rootScope', '$scope', '$state', 'HomeSrv', '$localForage',
    function ($log, $rootScope, $scope, $state, HomeSrv, $localForage) {

      var mv = this;
      mv.toggleRemember = _toggleRemember;
      mv._setValid = _setValid;
      mv.goToCarParkList = _goToCarParkList;
      $scope.rememberRegNumber = false;
      $scope.showError = false;
      $scope.homeForm = {};


      var employeeCached = $localForage.getItem('employeeCode');

      employeeCached.then(function (data) {
        if (!data) {
          $scope.rememberRegNumber = false;
          $scope.homeForm.employeeCode = null;
        } else {
          $scope.rememberRegNumber = true;
          $scope.homeForm.employeeCode = data;
        }
      });

      function _storeEmployeeCode () {
        $localForage.setItem('employeeCode', $scope.homeForm.employeeCode).then(function (data) {
          console.log('added to persistent storage', data);
        });
      }

      function _removeEmployeeCode () {
        $localForage.removeItem('employeeCode');
      }

      function _toggleRemember () {
        $scope.rememberRegNumber = !$scope.rememberRegNumber;
        _setEmployeeCode($scope.rememberRegNumber);

      }

      function _setEmployeeCode (remember) {
        if (remember) {
          _storeEmployeeCode();
        } else {
          _removeEmployeeCode();
        }
      }

      function _setValid () {
        $scope.showError = false;
      }

      function _goToCarParkList (employeeCode) {

        $rootScope.$broadcast('loading:show');

        if ($scope.rememberRegNumber) {
          _storeEmployeeCode();
        }

        HomeSrv.request.get({id: employeeCode}, function (user) {

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
