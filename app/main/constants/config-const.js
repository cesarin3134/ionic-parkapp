'use strict';
angular.module('main')
  .constant('Config', {

    // gulp environment: injects environment vars
    ENV: {
      /*inject-env*/

      'SERVER_URL': 'http://172.21.1.2:3000',
    'SERVER_API': 'http://172.21.1.2:5000',
    'SOME_OTHER_URL': '/postman-proxy'

      /*endinject*/
    },

    // gulp build-vars: injects build vars
    BUILD: {
      /*inject-build*/
      /*endinject*/
    }

  });
