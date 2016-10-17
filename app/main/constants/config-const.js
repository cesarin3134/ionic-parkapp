'use strict';
angular.module('main')
  .constant('Config', {

    // gulp environment: injects environment vars
    ENV: {
      /*inject-env*/
      'SERVER_URL': 'http://localhost:3000',
    'SERVER_API': 'http://localhost:5000',
    'SOME_OTHER_URL': '/postman-proxy'
      /*endinject*/
    },

    // gulp build-vars: injects build vars
    BUILD: {
      /*inject-build*/
      /*endinject*/
    }

  });
