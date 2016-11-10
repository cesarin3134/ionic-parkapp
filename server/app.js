var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var colors = require('colors');

var logger = require("mm-node-logger")(module);

var pkg = require('./package.json');

var config = require('./config/config');

var _ = require('lodash');

var app = express();

var port = 5000;

mongoose.set('debug', true);

//prettify json response
app.set('json spaces', 4);

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method-Override'));

//CORS support - it make your API public
app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.status(204).send();
  }
  else {
    next();
  }
});

//connect to DB
mongoose.connect(config.mongodb.dev.dbURI);

mongoose.connection.once('open', function () {
  //load models
  app.models = require('./models/index');
  //load routes
  var routes = require('./routes/routes');

  _.each(routes, function (controller, route) {

    var _controller = controller(app, route);

    app[_controller.method](route, _controller.handler);

  });

  var listener = app.listen(port, function () {

    var serverBanner = ['',
      '*************************************' + ' NODE SERVER '.yellow + '********************************************',
      '*',
      '* ' + pkg.description,
      '* @version ' + pkg.version.rainbow,
      '* @author ' + pkg.author,
      '* @copyright ' + new Date().getFullYear() + ' ' + pkg.author,
      '*',
      '*' + ' App started on port: '.blue + config.server.port,
      '*',
      '*************************************************************************************************',
      ''].join('\n');

    logger.info(serverBanner);

  });

});


