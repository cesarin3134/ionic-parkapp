var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var carParkDB = "mongodb://localhost:27017/carparkapp";
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS support
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.set('debug', true)

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

  var listener = app.listen(5000, function () {
    console.log('connected, listening on port ' + listener.address().port);
  });

});

/*app.get('/', function (req, res) {
  res.send('RESTful API car park');
});*/


