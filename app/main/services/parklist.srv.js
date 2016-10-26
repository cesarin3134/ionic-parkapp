/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular) {
  angular.module('main').constant('PARK_LIST_CONST', {
    'RELATIVE_URL': '/parks/'
  }).factory('ParkListSrv', ['$resource', 'Config', 'PARK_LIST_CONST', function ($resource, Config, PARK_LIST_CONST) {

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
          }
        );
      }
      return parkList;
    }

    return {
      getParkingList: _getParkingList,
      request: $resource(Config.ENV.SERVER_API + PARK_LIST_CONST.RELATIVE_URL + ':employeeCode/:allocationDate', {
        employeeCode: '@employeeCode',
        allocationDate: '@allocationDate'

      }, {
        'updateAllocation': {
          url: Config.ENV.SERVER_API + PARK_LIST_CONST.RELATIVE_URL + 'update/:parkNumber',
          method: 'PUT',
          params: {
            employeeCode: null
          }
        }
      })
    };

  }]);
})(angular);
