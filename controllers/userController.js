const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.json({ error: "please provide username" });
  }
  try {
    const user = await User.create({ username });
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res.json(error);
  }
};
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
};

module.exports = {
  createUser,
  getAllUsers,
};
