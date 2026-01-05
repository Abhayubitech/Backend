const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/addCourse", userController.getUsers);
router.get("/getCourse/:id", userController.createUser);
router.get("/getAllCourse", userController.createUser);
router.get("/deleteCourse/:id", userController.createUser);
router.post("/updateCourse", userController.createUser);

module.exports = router;
