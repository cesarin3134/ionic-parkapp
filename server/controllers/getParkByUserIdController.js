module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      if (req.params.id) {
        var employeeCode = req.params.id.toUpperCase();
        Park.find({"allocations.employeeCode": employeeCode}, function (error, park) {
          if (!error) {
            if(park.length > 0) {
              res.send(park);
            }else {
              res.status(404).send("The resource doesn't exist!");
            }
          } else {
            console.log('ERROR : ', error);
          }
        });
      }
    },
    "method": "get"
  }
};
