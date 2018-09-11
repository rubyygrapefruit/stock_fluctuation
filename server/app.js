const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const routes = require("../routes");

mongoose.connect(
  process.env.MONGODB_URI,
  err => {
    console.log(err || `MongoDB connected`);
  }
);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/api", routes);

module.exports = {
  app,
  mongoose
};
