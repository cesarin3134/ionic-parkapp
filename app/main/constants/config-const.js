'use strict';
angular.module('main')
  .constant('Config', {

    // gulp environment: injects environment vars
    ENV: {
      /*inject-env*/

      'SERVER_URL': 'http://192.168.1.69',
    'SERVER_API': 'http://192.168.1.185:3000'

      /*endinject*/
    },

    // gulp build-vars: injects build vars
    BUILD: {
      /*inject-build*/
      /*endinject*/
    }

  });
