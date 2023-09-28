const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Log = require("../models/Log");
const { StatusCodes } = require("http-status-codes");

const getSingleUserLogs = async (req, res) => {
  //await Exercise.deleteMany({});
  //await User.deleteMany({});
  //await Log.deleteMany({});

  const { from, to, limit } = req.query; // Parse query parameters
  console.log(from, to, limit);
  const userId = req.params.id;
  const user = await User.find({ _id: userId });
  const username = user[0].username;
  // Apply date filters if 'from' and 'to' are provided

  const userExercises = await Exercise.find({ userId }).select({
    username: 0,
  });
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
