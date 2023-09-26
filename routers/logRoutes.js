const express = require("express");
const router = express.Router();

const { getLogs } = require("../controllers/exerciseController");

router.route("/:id/logs").get(getLogs);

module.exports = router;
