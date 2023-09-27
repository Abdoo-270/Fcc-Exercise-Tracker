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
  const exercise = await Exercise.create({
    user: user[0],
    description,
    duration,
    date,
  });
  res.status(StatusCodes.CREATED).json(exercise);
};

module.exports = {
  createExercise,
};
