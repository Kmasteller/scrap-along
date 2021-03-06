// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");

// Initialize Express
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// Our scraping tools
const request = require("request");
const cheerio = require("cheerio");

// Require all models
// const db = require("./models");

// Use body-parser for JSON
app.use(bodyParser.json());
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Configure middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB or localhost
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tsScraperdb";

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// ROUTES
// A GET route for scraping the twisted sifter website
require("./routes/apiRoutes.js")(app)
// require("./routes/viewRoutes.js")(app)

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
