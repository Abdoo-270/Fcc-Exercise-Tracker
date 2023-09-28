const mongoose = require("mongoose");
const ExerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
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
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
