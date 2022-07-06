//Utilisation de express

var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./models/dbconfig");
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
