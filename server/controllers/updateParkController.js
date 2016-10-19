module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      if (req.params.id) {

        var id = req.params.id;

        Park.findOneAndUpdate({"_id.parkNumber": id}, function (error, park) {

          park.allocations = req.body.allocations;

          park.save(function (err, park) {
            if (!err) {
              console.log("Park Updated", park);
            } else {
              console.log("ERROR : " + err);
            }
          })


        });
      }
    },
    "method": "put"
  }
};
