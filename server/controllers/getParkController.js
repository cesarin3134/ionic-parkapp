module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      Park.find({"_id.parkNumber" : req.params.id}, function (error, park) {
        if (!error) {
          res.send(park);
        } else {
          console.log('ERROR : ', error);
        }
      })
    },
    "method": "get"
  }
};
