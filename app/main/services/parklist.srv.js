/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular) {
  angular.module('main').factory('ParkListSrv', ['$resource', function ($resource) {

    function _getParkingList () {

      var parkList = [];
      var today = new Date();
      var tomorrow = new Date();

      for (var i = 0; i < 20; i++) {

        parkList.push({
            'id': {'parkNumber': i, 'location': 'Bisceglie'},
            'allocations': [{
              'user': 'Mario Rossi', 'employeeNumber': Math.random().toString(36).slice(3, 8).toUpperCase(),
              'date': new Date(tomorrow.setDate(today.getDate() + i)).toISOString()
            }]
            /*,
             'parkCode': Math.random().toString(36).slice(3, 8).toUpperCase(),
             'date': new Date(tomorrow.setDate(today.getDate() + i)).toISOString(),
             'isFree': Math.random() >= 0.5*/
          }
        );
      }
      return parkList;
    }

    return {
      getParkingList: _getParkingList,
      request: $resource('carpark/list/:id')
    };

  }]);
})(angular);
