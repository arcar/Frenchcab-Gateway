const express = require("express");

const router = express.Router();
const coursesControllers = require("../controllers/coursesControllers");

router.get("/", coursesControllers.getCourses);
router.post("/", coursesControllers.creerCourse);

module.exports = router;