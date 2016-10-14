module.exports = function (app, route) {
  var Employee = app.models.employee;
  return {
    "handler": function (req, res) {
      Employee.find(function (error, parks) {
        if (!error) {
          res.send(parks);
        } else {
          console.log('ERROR : ', error);
        }
      });
    },
    "method": "get"
  }
};
