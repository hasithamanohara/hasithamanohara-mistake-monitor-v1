const mongoose = require('mongoose');

const mistakeSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: { type: String, required: true },
  description: String,
  shift: String,
  solved: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mistake', mistakeSchema);