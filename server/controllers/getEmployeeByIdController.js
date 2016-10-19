module.exports = function (app, route) {
  var Employee = app.models.employee;
  return {
    "handler": function (req, res) {

      if (req.params) {

        var _employeeCode = req.params.id.toUpperCase();

        Employee.find({employeeCode: _employeeCode}, function (error, employee) {
          if (!error) {
            if(employee.length > 0) {
              res.send(employee);
            }else {
              return res.send({"ErrorMessage":"Utente non trovato"});
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
