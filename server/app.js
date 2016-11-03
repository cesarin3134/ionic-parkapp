var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var localDb = "mongodb://localhost:27017/carparkapp";
var prodDb = "mongodb://172.21.1.6:27017/carparkapp";
var carParkDB = prodDb;
var app = express();
var port = 5000;

mongoose.set('debug', true);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS support - it make your API public
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//connect to DB
mongoose.connect(carParkDB);

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
    console.log('connected, listening on port ' + listener.address().port);
  });

});


