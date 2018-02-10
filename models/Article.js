// Setup Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Article Object Schema
var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true,
    unique: true
  },
  
  link: {
    type: String,
    required: true
  },

  //Stores note to an ID
  note:[{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
  });

// Create model from Schema
var Article = mongoose.model("Article", ArticleSchema);

// Export
module.exports = Article;
