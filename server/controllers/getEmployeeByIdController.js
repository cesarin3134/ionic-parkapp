module.exports = function (app, route) {
  var Employee = app.models.employee;
  return {
    "handler": function (req, res) {

      Employee.find({employeeCode: req.params.id}, function (error, employee) {
        if (!error) {
          res.send(employee);
        } else {
          res.status(500).send("Server Error" + error);
        }
      })
    },
    "method": "get"
  }
};
