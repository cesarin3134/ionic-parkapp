module.exports = function (app, route) {
  var Park = app.models.park;
  return {
    "handler": function (req, res) {

      /*if you want to get park by date is necessaru use the javascript method Date.parse()
      * to get a timestamp to pass into the url (i.e Date.parse("2012-03-08T12:17:24.000Z"),
       * it'll return a timestamp)*/

      if (req.params.date) {

        var parseDate = parseInt(req.params.date);
        /*mongoDb save format date automatically as a ISODate(2016-10-14T13:36:32.000Z)
         so when you want to save a date just send the result of new Date and mongoDB
         save it automatically*/
        var allocatedDate = new Date(parseDate).toISOString();
        /*But when you want to filter result by date you have to pass a date format 2016-10-14T13:36:32.000Z and it
        * converts the data to new Date("Fri, 14 Oct 2016 13:36:32 GMT") */
        Park.find({"allocations.date": allocatedDate}, function (error, park) {
          if (!error) {
            if(park.length > 0) {
              res.send(park);
            }else {
              res.status(404).send("The resource doesn't exist!");
            }
          } else {
            res.status(500).send("Server Error" + error);
            console.log('ERROR : ', error);
          }
        });
      }
    },
    "method": "get"
  }
};
