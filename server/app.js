/**
 * Server node to run Intesa application parking
 *
 * @author Cesar Andavisa - cesar.andavisa@gmail.com
 *
 * @copyright copyright (c) Cesar Andavisa
 *
 */

//expressJS library used to create a RESTful API
var express = require('express');

// drivers MongoDB for nodeJS
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

// add color to console message
var colors = require('colors');

// Use it to show logs
var logger = require("mm-node-logger")(module);

// import this file to use information into it
var pkg = require('./package.json');

// it contains information about the app configuration
var config = require('./config/config');

var path = require('path');

// lib to work on javascript arrays and objects in a fast way
var _ = require('lodash');

// create an express app
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

// it serve static file from the server, in this case it send to the client files
// contained into the www directory
app.use(express.static(path.join(__dirname, 'www')));

// unable debug for mongoose
mongoose.set('debug', true);

//prettify json response
app.set('json spaces', 4);

app.use(bodyParser.urlencoded({extended: true}));

// check if the request payload format is JSON
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method-Override'));

//CORS support - it make the API public
app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  res.header('Access-Control-Allow-Headers', 'If-Modified-Since, Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.status(204).send();
  }
  else {
    next();
  }
});

//connect to DB
mongoose.connect(config.mongodb.dbURI);

mongoose.connection.once('open', function () {
  //load models
  app.models = require('./models/index');
  //load routes
  var routes = require('./routes/routes');

  _.each(routes, function (controller, route) {

    var _controller = controller(app, route);

    app[_controller.method](route, _controller.handler);

  });

  /*Defined sockectIO messages*/

  /*io.sockets.on('connection', function (socket) {

   logger.info("*********** someone is connected throughout sockectIO ***********".yellow);

   socket.on('allocated', function (data) {

   logger.info("*********** allocated ***********".yellow);
   logger.info('allocated params :'.green, data);
   io.sockets.emit('reloadList', data);

   });
   });*/

  io.sockets.on('connection', function (socket) {
    logger.info("*********** someone is connected throughout sockectIO ***********".yellow);
    socket.on('allocated', function (data) {
      logger.info("*********** allocated ***********".yellow);
      io.sockets.emit('reloadList', data);
    });

  });

  server.listen(config.server.port, function () {

    var serverBanner = ['',
      '*************************************' + ' NODE SERVER '.yellow + '********************************************',
      '*',
      '* ' + pkg.description,
      '* @version ' + pkg.version.rainbow,
      '* @author ' + pkg.author,
      '* @copyright ' + new Date().getFullYear() + ' ' + pkg.author,
      '*',
      '*' + ' App started on port: '.blue + config.server.port,
      //  '*' + ' App started on host: '.yellow + config.server.host,
      '*',
      '*************************************************************************************************',
      ''].join('\n');

    logger.info(serverBanner);

  });

});
