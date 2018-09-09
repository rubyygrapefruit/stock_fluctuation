const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("../routes");
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/stocks";

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true },
  err => {
    console.log(err || `MongoDB connected!`);
  }
);

app.use(express.static("public"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(PORT, err =>
  console.log(err || `Now listening on port ${PORT}  🤓 👨🏽‍💻`)
);
