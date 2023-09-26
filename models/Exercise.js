const mongoose = require("mongoose");
const ExerciseSchema = new mongoose.Schema(
  {
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
      default: new Date(),
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
