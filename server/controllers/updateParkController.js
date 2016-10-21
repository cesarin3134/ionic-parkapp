module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      console.log(req.params);
      console.log(req.body);

      var _parkNumber;
      var _allocationRequestObj;
      var _idAllocation;

      if (req.params || req.body) {

        _parkNumber = req.params.parkNumber ? req.params.parkNumber : null;
        _idAllocation = req.params.idAllocation ? req.params.idAllocation : null;
        _allocationRequestObj = req.body ? req.body : null;

        if (_parkNumber !== null && _allocationRequestObj || null) {

          Park.findOneAndUpdate({"_id.parkNumber": _parkNumber}, {
            $set: {
              "allocations": _allocationRequestObj.allocations
            }
          }, {new: true}, function (error, park) {
            if (!error) {
              res.send(park);
              console.log("Park Updated", park);
            } else {
              console.log("ERROR : " + error);
            }
          });
        }


      }

      /* if (req.params) {

       var id = req.params.parkNumber;

       if (!req.params.idAllocation) {
       Park.findOneAndUpdate({"_id.parkNumber": id}, {
       $push: {"allocations": req.body.allocation}
       }, {new: true}, function (error, park) {
       if (!err) {
       console.log("Park Updated", park);
       } else {
       console.log("ERROR : " + err);
       }

       });
       } else {
       Park.findOneAndUpdate({
       "_id.parkNumber": id
       }, {
       $pull: {
       allocations: {"_id": req.params.idAllocation}
       }
       }, {new: true}, function (error, park) {
       if (!err) {
       console.log("Park Updated", park);
       } else {
       console.log("ERROR : " + err);
       }
       })
       }

       }*/
    },
    "method": "put"
  }
};
