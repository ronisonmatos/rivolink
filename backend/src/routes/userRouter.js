"use strict";
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const RateLimit = require('express-rate-limit');
const cors = require('cors');

// Define a configuração do rate limiter
const limiter = RateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 10,
    message: { error: "Muitas requisições. Por favor, tente novamente mais tarde." }
});

// Aplica o rate limiter a todas as requisições
router.use(limiter);

router.use(cors())

router.get("/user", UserController.getAllUser);
router.get("/user/:id", UserController.getUserById);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
