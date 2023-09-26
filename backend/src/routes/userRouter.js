"use strict";
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const RateLimit = require('express-rate-limit');
const cors = require('cors');

// Define a configura��o do rate limiter
const limiter = RateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 10,
    message: { error: "Muitas requisi��es. Por favor, tente novamente mais tarde." }
});

// Aplica o rate limiter a todas as requisi��es
router.use(limiter);

router.use(cors())

router.get("/user", UserController.getAllUser);
router.get("/user/:id", UserController.getUserById);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
