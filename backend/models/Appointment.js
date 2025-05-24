const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  date: Date,
  doctor: String,
  symptoms: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
