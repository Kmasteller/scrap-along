// Setup Mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the note Schema
var NoteSchema = new Schema({
  
  title: String,
  
  comment: String
});

// Create the note model
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;