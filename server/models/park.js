var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create an schema
var AllocationSchema = new Schema({
    userName: String,
    employeeCode: {
      type: String,
      uppercase: true
    },
    date: Date
  }
);

var ParkSchema = new Schema({
  _id: {
    parkNumber: {
      type: Number,
      unique: true
    },
    location: String
  },
  allocations: [AllocationSchema]
});
//export the schema
module.exports = mongoose.model('Park', ParkSchema);
