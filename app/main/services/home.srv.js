/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular) {
  angular.module('main').constant('HOME_CONST', {
    'RELATIVE_URL': '/employee/'
  }).factory('HomeSrv', ['$resource', 'Config', 'HOME_CONST', function ($resource, Config, HOME_CONST) {

    return {
      request: $resource(Config.ENV.SERVER_API + HOME_CONST.RELATIVE_URL + ':action/:id', {
        action: '@action'
      })
    };

  }]);
})(angular);
