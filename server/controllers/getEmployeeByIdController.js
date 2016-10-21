module.exports = function (app, route) {
  var Employee = app.models.employee;
  return {
    "handler": function (req, res) {

      if (req.params) {

        var _employeeCode = req.params.id.toUpperCase();

        Employee.findOne({employeeCode: _employeeCode}, function (error, employee) {
          if (!error) {
            if (employee) {
              res.send(employee);
            } else {
              return res.send({
                "errorMessage": true,
                "errorDescription": "Numero di matricola non trovata"
              });
            }
          } else {
            res.status(500).send("Server Error" + error);
          }
        })
      }

    },
    "method": "get"
  }
};
