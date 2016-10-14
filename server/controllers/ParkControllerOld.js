var restful = require('node-restful');

module.exports = function (app, route) {

//Setup the controller for REST
  var Resource = restful.model(
    'park',
    app.models.park
  ).methods(['get', 'put', 'post', 'delete']);

  /*
   * this route return all allocated park
   */
  Resource.route('allocated', ['get'], {
    detail: false,
    handler: function (req, res, next) {
      console.log(req.quer);
      Resource.find({"allocations": {$exists: true, $not: {$size: 0}}}, function (err, list) {
        return res.send(list);
        next();
      });
    }
  });

  /*this route return all unallocated park*/
  Resource.route('toallocate', ['get'], {
    detail: false,
    handler: function (req, res, next) {
      Resource.find({"allocations": {$size: 0}}, function (err, list) {
        return res.send(list);
        next();
      });
    }
  });

//Register this endPoint with the application
  Resource.register(app, route);

  //Return the middleware
  return function (req, res, next) {
    //console.log(req, 'req');
    //console.log(res, 'res');
    next();
  };
};



