"use strict";
const express = require("express");
const app = express();
const port = 3004;

app.use(express.json());

const blogRouter = require("./src/routes/blog");
app.use(blogRouter);

const userRouter = require("./src/routes/userRouter");
app.use(userRouter);

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
