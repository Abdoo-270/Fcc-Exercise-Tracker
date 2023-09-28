const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Log = require("../models/Log");
const { StatusCodes } = require("http-status-codes");

const getSingleUserLogs = async (req, res) => {
  try {
    const { from, to, limit } = req.query; // Parse query parameters
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId }); // Use findOne to directly get the user
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    const username = user.username;

    // Create a query object with the userId
    const query = { userId };

    // Optionally filter by date range
    if (from && to) {
      query.date = { $gte: new Date(from), $lte: new Date(to) };
    }

    // Apply the limit
    const limitValue = parseInt(limit) || 0;

    const userExercises = await Exercise.find(query)
      .select({ username: 0 })
      .limit(limitValue);

    // Convert the date field to a string representation
    const userExercisesWithDateString = userExercises.map((exercise) => {
      return {
        ...exercise._doc,
        date: exercise.date.toDateString(),
      };
    });

    const log = await Log.create({
      username,
      count: userExercisesWithDateString.length,
      log: userExercisesWithDateString,
    });

    res.json(log);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

module.exports = {
  getSingleUserLogs,
};

/*
const Exercise = require("../models/Exercise");
const User = require("../models/User");
const Log = require("../models/Log");
const { StatusCodes } = require("http-status-codes");

const getSingleUserLogs = async (req, res) => {
  //await Exercise.deleteMany({});
  //await User.deleteMany({});
  //await Log.deleteMany({});

  const { from, to, limit } = req.query; // Parse query parameters
  // console.log(from, to, limit);
  const userId = req.params.id;
  const user = await User.find({ _id: userId });
  const username = user[0].username;
  // Apply date filters if 'from' and 'to' are provided

  const userExercises = await Exercise.find({ userId }).select({
    username: 0,
  });
  // Convert the date field to a string representation
  const userExercisesWithDateString = userExercises.map((exercise) => {
    return {
      ...exercise._doc,
      date: exercise.date.toDateString(), // Convert the Date to ISO string
    };
  });
  console.log(userExercisesWithDateString);
  const log = await Log.create({
    username,
    count: userExercisesWithDateString.length,
    log: userExercisesWithDateString,
  });
  res.json(log);
};
module.exports = {
  getSingleUserLogs,
};
*/
