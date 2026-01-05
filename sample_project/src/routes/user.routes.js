const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// router.post("/auth", userController.getUsers);
router.post("/createUser", userController.createUser);
// router.get("/getUser/:id", userController.createUser);
// router.get("/getAllUsers", userController.createUser);
// router.get("/deleteUser/:id", userController.createUser);
// router.post("/updateUser", userController.createUser);

module.exports = router;
