module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {
      Park.find({"allocations": {$exists: true, $not: {$size: 0}}}, function (error, parks) {
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
