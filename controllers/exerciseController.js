const Exercise = require("../models/Exercise"); // Import your Exercise model
const User = require("../models/User"); // Import your User model

const addExercise = async (req, res) => {
  const userId = req.params.id;
  const { description, duration, date } = req.body;

  try {
    // Find the user by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new exercise
    const exercise = new Exercise({
      userId: userId,
      description: description,
      duration: duration,
      date: date || new Date(), // Use the provided date or the current date
    });

    // Save the exercise to the database
    await exercise.save();

    // Add the exercise to the user's log
    user.exercises.push(exercise);

    // Save the updated user
    await user.save();

    // Return the updated user object with exercise fields added
    res.json({
      _id: user._id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addExercise,
};

/*
const Exercise = require("../models/Exercise");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const createExercise = async (req, res) => {
  const userId = req.params.id;
  const user = await User.find({ _id: userId });
  console.log(user);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "no user found" });
  }
  const { description, duration, date } = req.body;
  if (!description || !duration) {
    res.status(StatusCodes.BAD_REQUEST).json("please fill all the fields");
  }
  if (date) {
    var formatedDate = date.toDateString();
  }
  const formattedTodayDate = new Date().toDateString();
  const exercise = await Exercise.create({
    userId: user,
    description,
    duration,
    date: formatedDate || formattedTodayDate,
  });
  res.status(StatusCodes.CREATED).json(exercise);
};

module.exports = {
  createExercise,
};
*/
