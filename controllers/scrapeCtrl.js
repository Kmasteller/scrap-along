const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = {
  scrape: function(req, res){
      // First, we grab the body of the html with request
      request("http://www.twistedsifter.com/", function (err, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // var artTitleArray = [];
        // console.log($);
        // Now, we grab every h2 within an article tag, and do the following:
        $("h2.headline").each(function (i, element) {
         
          // Add the text and href of every link, and save them as properties of the result object
          var title = $(element)
            .children()
            .text()
            .trim();
          var link = $(element)
            .children()
            .attr("href")
            .trim();

          var article = {
              title,
              link
          }

          // Create a new Article using the `result` object built from scraping
          db.Article.create(article)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
              res.redirect("/")
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              console.log(err);
              res.redirect("/")
            });
        });
        // If we were able to successfully scrape and save an Article, send a message to the client
  
        // console.log("++++", res, "+++++");
      });
    }
  }