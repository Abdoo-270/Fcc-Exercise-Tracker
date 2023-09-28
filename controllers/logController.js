const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Log = require("../models/Log");
const { StatusCodes } = require("http-status-codes");

const getSingleUserLogs = async (req, res) => {
  const { from, to, limit } = req.query; // Parse query parameters

  const userId = req.params.id;
  const user = await User.find({ _id: userId });
  const username = user[0].username;
  let query = { username };
  // Apply date filters if 'from' and 'to' are provided
  if (from && to) {
    query.date = { $gte: new Date(from), $lte: new Date(to) };
  }
  const userExercises = await Exercise.find(query)
    .select({
      username: 0,
    })
    .limit(parseInt(limit) || undefined) // Limit the number of logs
    .sort({ date: "desc" }); // Sort logs by date in descending order

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
