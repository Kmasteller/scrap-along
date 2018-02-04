var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");
module.exports = {
  scrape: function(req, res){
      // First, we grab the body of the html with request
      request.get("http://www.twistedsifter.com/", function (err, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // Now, we grab every h2 within an article tag, and do the following:
        $("h2.headline").each(function (i, element) {
          // Save an empty result object
          var result = {};
          console.log(result);
          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");

          // Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function (dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function (err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
      });
    }
  }
