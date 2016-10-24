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
        var _year = _allocationDate.getFullYear();
        var _month = _allocationDate.getMonth() + 1;
        var _day = _allocationDate.getDate();
        var filterDate = new Date(_year + "-" + _month + "-" + _day);


        if (_employeeCode && filterDate) {

          Employee.find({"employeeCode": _employeeCode}, function (err, employee) {
            if (!err) {
              if (employee.length > 0) {
                Park.aggregate([
                    {
                      $unwind: "$allocations"
                    },
                    {
                      $match: {
                        "allocations.employeeCode": _employeeCode,
                        "allocations.date": new Date(filterDate.toISOString())
                      }
                    }, {
                      $project: {
                        parkNumber: "$parkId.parkNumber",
                        location: "$parkId.location",
                        locked: true
                      }
                    },
                    {$sort: {parkNumber: 1}}],
                  function (error, parks) {


                    if (!error) {
                      if (parks.length <= 0) {

                        Park.aggregate([
                          {
                            $unwind: {
                              "path": "$allocations",
                              "preserveNullAndEmptyArrays": true
                            }
                          },
                          {
                            $match: {
                              "allocations.date": {$ne: new Date(filterDate.toISOString())}
                            }
                          },
                          {
                            $project: {
                              parkNumber: "$parkId.parkNumber",
                              location: "$parkId.location",
                              locked: "$locked"
                            }
                          }, {$sort: {parkNumber: 1}}], function (error, parks) {
                          res.send(parks);
                        });
                        /*Park.find({"allocations.date": {$ne: new Date(filterDate.toISOString())}}, function (error, parks) {
                         if (!error) {
                         res.send(parks);
                         } else {
                         console.log('ERROR : ', error);
                         }
                         }).sort({"parkId" : 1})*/

                      } else {
                        res.send(parks);
                      }

                    } else {
                      res.status(500).send("Server Error" + error);
                    }
                  })
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
