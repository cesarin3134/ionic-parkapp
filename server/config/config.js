/**
 * An application configuration.
 *
 * @author    Cesar Andavisa
 * @copyright Copyright (c) 2016, Cesar Andavisa
 * @license    The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

var config = {};

config.environment = 'development';

config.endpoint = [
  {
    host: '172.16.2.55',
    port: 3000,
    envName: "private ip"
  },
  {
    host: '172.21.1.2',
    port: 80,
    envName: "production"
  },
  {
    host: '127.0.0.1',
    port: 3000,
    envName: "localhost"
  }
];

config.mongodbEndpoint = [
  {
    dbURI: "mongodb://localhost:27017/carparkapp",
    dbOptions: {"user": "", "pass": ""},
    envName: "development"

  },
  {
    dbURI: "mongodb://172.21.1.6:27017/carparkapp",
    dbOptions: {"user": "", "pass": ""},
    envName: "production"

  }
];

config.server = config.endpoint[2];
// MongoDB settings
config.mongodb = config.mongodbEndpoint[0];

module.exports = config;
