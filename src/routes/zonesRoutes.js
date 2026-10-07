const express = require("express");

const router = express.Router();
const zonesControllers = require("../controllers/zonesControllers");

router.get("/", zonesControllers.getZones);

module.exports = router;