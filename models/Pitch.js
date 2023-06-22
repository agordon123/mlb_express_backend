var mongoose = require("mongoose");

var PitchSchema = new mongoose.Schema({
  name: String,
  speed: Number,
  control: Number,
  movement: Number,
});

module.exports = mongoose.model("Pitch", PitchSchema);
