const express = require("express");

const router = express.Router();
const predictionsControllers = require("../controllers/predictionsControllers");

router.post("/duree", predictionsControllers.predireDuree);

module.exports = router;