const express = require("express");
const router = express.Router();

const {
  createExercise,
  addExercise,
} = require("../controllers/exerciseController");

router.route("/:id/exercises").post(addExercise);

module.exports = router;
