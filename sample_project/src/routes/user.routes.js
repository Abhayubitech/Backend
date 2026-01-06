const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/auth", userController.authenticateUser);
router.post("/createUser", userController.createUser);
router.get("/getUser/:id", userController.getUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/updateUser", userController.updateUser);
router.get("/getAllUser", userController.getAllUser);
router.post("/createUser", userController.createUser);
router.get("/getUser/:id", userController.getUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/updateUser", userController.updateUser);


module.exports = router;
