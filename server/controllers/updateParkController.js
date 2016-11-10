module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {

      var _parkNumber;

      var _allocationRequestObj;

      if (req.params || req.body) {

        _parkNumber = req.params.parkNumber ? req.params.parkNumber : null;

        _allocationRequestObj = req.body ? req.body : null;

        if (_parkNumber !== null && _allocationRequestObj || null) {

          Park.findById({"_id": _parkNumber}, function (err, park) {

            var exist;
            var ix;
            var keepGoing = true;

            if (park.allocations.length > 0) {

              for (var i = 0; i < park.allocations.length; i++) {

                if (keepGoing) {
                  if (park.allocations[i].date.toISOString() === _allocationRequestObj.date) {
                    exist = true;
                    ix = i;
                    keepGoing = false;
                  } else {
                    exist = false;
                  }
                }
              }

              if (exist) {
                park.allocations.splice(ix, 1);
              } else {
                park.allocations.push(_allocationRequestObj);
              }

            } else {
              park.allocations.push(_allocationRequestObj);
            }

            park.save(function (error, park) {
              return res.send(park);
            });
          });
        }
      }


    },
    "method": "put"
  }
};
