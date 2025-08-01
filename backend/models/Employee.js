const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  position: String,
  shift: String,
});

module.exports = mongoose.model('Employee', employeeSchema);