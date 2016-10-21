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

      function _getCurrentDate () {
        var _currentDate = new Date();
        var _year = _currentDate.getFullYear();
        var _month = _currentDate.getMonth() + 1;
        var _day = _currentDate.getDate();

        return new Date(_year + "-" + _month + "-" + _day);
      }

      function _changeStatus (item) {

        var _allocationObj = {
          "userName": $scope.userName,
          "employeeCode": $scope.employeeCode,
          "date": _getCurrentDate()
        };

        if (!item.locked) {
          var ix = item.allocations.push(_allocationObj);
          $scope.alloctionSubDocIndex = ix - 1;

        } else {

          if ($scope.alloctionSubDocIndex > -1) {
            item.allocations.splice($scope.alloctionSubDocIndex, 1);
          }

        }

        item.$update({"parkNumber": item._id.parkNumber}, function (park, error) {
          console.log(park);
          console.log(item.locations);

        });
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
          item.locked = false;
          newList.push(item);
        });

        return newList;
      }


      $scope.$on('$ionicView.afterEnter', function () {
        ParkListSrv.request.query({
          employeeCode: $scope.employeeCode,
          allocationDate: new Date().getTime()
        }, function (parkList) {
          //$scope.parkingList = _checkParkStatus(parkList);
          $scope.parkingList = parkList;

        }, function (err) {
          $log.log('Using stubs data because you got request error :', err);
          $scope.parkingList = ParkListSrv.getParkingList();
        });
      });

    }]);

})(angular);
