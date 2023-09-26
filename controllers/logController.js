const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Log = require("../models/Log");
const { StatusCodes } = require("http-status-codes");

const getSingleUserLogs = async (req, res) => {
  const userId = req.params.id;
  const user = await User.find({ _id: userId });
  const username = user[0].username;

  const userExercises = await Exercise.find({ username });
  const log = await Log.create({
    username,
    count: userExercises.length,
    log: userExercises,
  });
  res.json(log);
};
module.exports = {
  getSingleUserLogs,
};
