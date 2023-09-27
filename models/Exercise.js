const mongoose = require("mongoose");
const User = require("./User");
const ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  duration: {
    type: Number,
    required: [true, "please provide duraiton"],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: Object,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
