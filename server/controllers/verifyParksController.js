var moment = require('moment');

module.exports = function (app, route) {
  var Park = app.models.park;
  var Employee = app.models.employee;
  return {
    "handler": function (req, res) {

      if (req.params) {

        var _employeeCode = req.params.employeeCode.toUpperCase();

        var requestDate = parseInt(req.params.allocationDate);
        var _allocationDate = new Date(requestDate);
        _allocationDate.setHours(12);
        _allocationDate.setMinutes(0);
        _allocationDate.setSeconds(0);
        _allocationDate.setMilliseconds(0);

        var filterDate = new Date(_allocationDate);

        if (_employeeCode && filterDate) {

          Employee.find({"employeeCode": _employeeCode}, function (err, employee) {
            if (!err) {
              if (employee.length > 0) {

                Park.find({
                    $and: [{
                      "allocations": {
                        $elemMatch: {
                          "date": {
                            $eq: new Date(filterDate.toISOString())
                          },
                          "employeeCode": _employeeCode
                        }
                      }
                    }]
                  },
                  function (error, parks) {
                    if (!error) {
                      if (parks.length <= 0) {
                        Park.find({
                          $or: [{"allocations": {$size: 0}},
                            {
                              "allocations": {
                                $not: {
                                  $elemMatch: {
                                    "date": new Date(filterDate.toISOString())
                                  }
                                }

                              }
                            }]
                        }, function (error, parks) {
                          return res.send(parks);
                        }).sort({"parkId.parkNumber": 1})

                      } else {
                       return res.send(parks);
                      }

                    } else {
                      res.status(500).send("Server Error" + error);
                    }
                  }).sort({"parkId.parkNumber": 1});

              } else {
                return res.send({
                  "errorMessage": true,
                  "errorDescription": "Numero di matricola non trovata"
                });
              }
            }
          });


        }
      }
    },
    "method": "get"
  }
};
