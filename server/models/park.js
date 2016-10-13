var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create an schema
var ParkSchema = new Schema({
  _id: {
    parkNumber: Number,
    location: String
  },
  allocations: [{
    userName: String,
    employeeId: String,
    date: Date
  }]
});
//export the schema
module.exports = ParkSchema;
