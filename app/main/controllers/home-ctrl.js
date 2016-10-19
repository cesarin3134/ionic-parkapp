/**
 * Created by candavisa on 04/10/16.
 */
'use strict';

(function (angular) {
  angular.module('main').controller('homeCtrl', ['$log', '$scope', '$state', 'HomeSrv',
    function ($log, $scope, $state, HomeSrv) {

      var mv = this;
      mv.toggleRemember = _toggleRemember;
      $scope.goToCarParkList = _goToCarParkList;
      $scope.rememberRegNumber = false;

      function _toggleRemember () {
        $scope.rememberRegNumber = !$scope.rememberRegNumber;
      }

      function _goToCarParkList (employeeNumber) {

        HomeSrv.request.query({id: employeeNumber}, function (user) {
          $scope.dataUser = user[0];

          $log.log($scope.dataUser);
          if($scope.dataUser) {
            $state.go('park-list', {dataUser: $scope.dataUser});
          }else{
            console.log("User not found");
          }


        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
        });


      }

      $scope.$on('$ionicView.afterEnter', function () {

      });

    }]);

})(angular);
