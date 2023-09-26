const express = require("express");
const router = express.Router();

const { getSingleUserLogs } = require("../controllers/logController");

router.route("/:id/logs").get(getSingleUserLogs);

module.exports = router;
