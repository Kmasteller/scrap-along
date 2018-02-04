const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Our scraping tools
// var request = require("request");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tsHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// ROUTES
// A GET route for scraping the twisted sifter website
require("./routes/apiRoutes.js")(app)
require("./routes/viewRoutes.js")(app)

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
