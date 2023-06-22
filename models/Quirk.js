var mongoose = require("mongoose");

var QuirkSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
});

module.exports = mongoose.model("Quirk", QuirkSchema);
