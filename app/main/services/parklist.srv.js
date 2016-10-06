/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular) {
  angular.module('main').factory('parkListSrv', [function () {
    return {

      getParkingList: function () {

        var parkList = [];

        for (var i = 0; i < 20; i++) {
          parkList.push({
            'id': i,
            'parkCode': Math.random().toString(36).slice(6).toUpperCase(),
            'isFree': Math.random() >= 0.5
          });
        }

        return parkList;
      }
    };
  }]);
})(angular);
