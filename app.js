const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pool = require('./db');
const config = require('./config');
const app =express();

// Déclaration des middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extends: true }));

