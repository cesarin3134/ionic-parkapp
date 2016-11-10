/**
 * An application configuration.
 *
 * @author    Cesar Andavisa
 * @copyright Copyright (c) 2016, Cesar Andavisa
 * @license    The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

var config = {};

config.enviroment = 'development';

config.server = {
  host: '192.168.1.185',
  port: 3000
};

// MongoDB settings
config.mongodb = {
  dev: {
    dbURI: "mongodb://localhost:27017/carparkapp",
    dbOptions: {"user": "", "pass": ""}
  },
  prod: {
    dbURI: "mongodb://172.21.1.6:27017/carparkapp",
    dbOptions: {"user": "", "pass": ""}
  }

};


module.exports = config;
