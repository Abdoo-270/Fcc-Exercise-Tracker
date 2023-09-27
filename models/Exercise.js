const mongoose = require("mongoose");
const User = require("./User");
const ExerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
