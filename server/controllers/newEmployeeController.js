module.exports = function (app, route) {
  var Employee = app.models.employee;
  return {
    "handler": function (req, res) {
      console.log(req.body);
      var newEmployee = new Employee({
        "userName": req.body.userName,
        "employeeCode": req.body.employeeCode
      });

      newEmployee.save(function (err, newemployee) {
        if (!err) {
          console.log('new employee added');
          res.send(newemployee);
        }
      });
    },
    "method": "post"
  }
}
;
