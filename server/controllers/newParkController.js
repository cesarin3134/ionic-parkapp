module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      console.log(req.body);
      var newPark = new Park({
        _id: {
          parkNumber: req.body._id.parkNumber,
          location: req.body._id.location
        },
        allocations: []
      });

      if (req.body.allocations) {
        newPark.allocations = req.body.allocations;
      }

      newPark.save(function (err, newpark) {
        if (!err) {
          console.log('new park added');
          res.send(newPark);
        }
      });
    },
    "method": "post"
  }
}
;
