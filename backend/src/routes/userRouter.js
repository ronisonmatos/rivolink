"use strict";
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/user", UserController.getAllUser);
router.get("/user/:id", UserController.getUserById);
router.post("/user/new", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
