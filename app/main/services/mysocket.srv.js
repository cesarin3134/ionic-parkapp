/**
 * Created by candavisa on 05/10/16.
 */
'use strict';
(function (angular, window) {
  angular.module('main').factory('Socket', ['socketFactory', 'Config', function (socketFactory, Config) {

    var myIoSocket = window.io.connect(Config.ENV.SERVER_API, {forceNew: true});

    var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
  }]);
})(angular, window);
