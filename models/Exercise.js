const mongoose = require("mongoose");
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
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
