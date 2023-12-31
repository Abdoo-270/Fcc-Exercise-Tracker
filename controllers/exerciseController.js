const Exercise = require("../models/Exercise");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const createExercise = async (req, res) => {
  const userId = req.params.id;
  const user = await User.find({ _id: userId });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "no user found" });
  }
  const { description, duration, date } = req.body;
  if (!description || !duration) {
    res.status(StatusCodes.BAD_REQUEST).json("please fill all the fields");
  }
  if (!date) {
    var formattedTodayDate = new Date().toDateString();
  }
  const exercise = await Exercise.create({
    username: user[0].username,
    userId: user[0]._id,
    description,
    duration,
    date: date || formattedTodayDate,
  });

  // Create the response object in the correct order
  const response = {
    _id: user[0]._id,
    username: user[0].username,
    date: exercise.date.toDateString(),
    duration: exercise.duration,
    description: exercise.description,
  };
  res.status(StatusCodes.CREATED).json(response);
};

module.exports = {
  createExercise,
};

/*
const { StatusCodes } = require("http-status-codes");
const Exercise = require("../models/Exercise"); // Import your Exercise model
const User = require("../models/User"); // Import your User model

const addExercise = async (req, res) => {
  const userId = req.params.id;
  const { description, duration, date } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.description = description;
    user.duration = duration;
    user.date = date || new Date();
    await user.save();
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "something wrong" });
  }
};
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


module.exports = {
  addExercise,
};

*/
