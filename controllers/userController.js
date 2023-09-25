const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.json({ error: "please provide username" });
  }
  const userAlreadyExists = await User.findOne({ username });
  if (userAlreadyExists) {
    res.json({ error: "User already exists" });
  }
  try {
    const user = await User.create({ username });
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res.json(error);
  }
};
const getAllUsers = (req, res) => {
  res.json("get all users");
};

module.exports = {
  createUser,
  getAllUsers,
};
