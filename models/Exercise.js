const mongoose = require("mongoose");
const User = require("./User");
const ExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
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
  username: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
