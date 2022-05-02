const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./models/dbconfig")
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

const path = require("path");

//Création d'application express
const app = express();

//Import des routes

// const sauceRoutes = require("./route/sauce");


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


  app.use(bodyParser.json());


  app.use("/api/auth", userRoutes);
  app.use("/api/sauces", saucesRoutes);

  module.exports = app