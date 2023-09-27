const Exercise = require("../models/Exercise");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

//The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
const createExercise = async (req, res) => {
  const userId = req.params.id;
  const existingUser = await User.findOne({ _id: userId });
  if (!existingUser) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "no user found" });
  }
  const { description, duration, date } = req.body;
  if (!description || !duration) {
    res.status(StatusCodes.BAD_REQUEST).json("please fill all the fields");
  }
  const exercise = new Exercise({
    description,
    duration,
    date: date || new Date(),
    user: existingUser._id,
  });
  await exercise.save();
  console.log(exercise);
  res.status(StatusCodes.CREATED).json(exercise);
};

module.exports = {
  createExercise,
};
