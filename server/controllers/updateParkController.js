module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      /*console.log(req.params);
       console.log(req.body);*/

      var _parkNumber;
      var _allocationRequestObj;
      var _idAllocation;

      if (req.params || req.body) {

        _parkNumber = req.params.parkNumber ? req.params.parkNumber : null;
        _idAllocation = req.params.idAllocation ? req.params.idAllocation : null;
        _allocationRequestObj = req.body ? req.body : null;

        if (_parkNumber !== null && _allocationRequestObj || null) {

          Park.findById({"_id": _parkNumber}, function (err, park) {

            if (park.allocations.length > 0) {
              for (var i = 0; i < park.allocations.length; i++) {
                if (park.allocations[i].date.toISOString() !== _allocationRequestObj.date) {
                  park.allocations.push(_allocationRequestObj);
                  park.locked = true;
                } else {
                  park.allocations.splice(i, 1);
                  park.locked = false;
                }
              }
            } else {
              park.allocations.push(_allocationRequestObj);
              park.locked = true;
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
