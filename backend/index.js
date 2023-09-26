"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const logger = require('../backend/config/logger');
const port = process.env.APP_PORT;

app.use(express.json());

const userRouter = require("./src/routes/userRouter");
app.use(userRouter);

app.listen(port, () => {
  logger.info(`App starting on port:${port}`)
});
