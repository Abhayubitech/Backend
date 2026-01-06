const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

router.post("/addCourse", courseController.createCourse);
router.get("/getCourse/:id", courseController.getCourse);
router.get("/getAllCourse", courseController.getAllCourse);
router.delete("/deleteCourse/:id", courseController.deleteCourse);
router.post("/updateCourse", courseController.updateCourse);

module.exports = router;
