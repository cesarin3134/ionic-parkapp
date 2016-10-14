module.exports = function (app, route) {
  var Employee = app.models.employee;
  return {
    "handler": function (req, res) {
      Employee.findById(req.params.id, function (error, employee) {
        if (!error) {
          res.send(employee);
        } else {
          console.log('ERROR : ', error);
        }
      })
    },
    "method": "get"
  }
};
