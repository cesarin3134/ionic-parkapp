var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({
  userName: String,
  employeeCode: {
    type: String,
    uppercase: true
  },
  lastAccess: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employee', Employee);
