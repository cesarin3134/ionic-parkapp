module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      if (req.params.id) {
        var employeeCode = req.params.id.toUpperCase();
        Park.find({"allocations.employeeCode": employeeCode}, function (error, park) {
          if (!error) {
            res.send(park);
          } else {
            console.log('ERROR : ', error);
          }
        });
      }
    },
    "method": "get"
  }
};
