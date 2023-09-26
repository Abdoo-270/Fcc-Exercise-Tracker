const express = require("express");
const router = express.Router();

const { createExercise } = require("../controllers/exerciseController");

router.route("/:id/exercises").post(createExercise);

module.exports = router;
