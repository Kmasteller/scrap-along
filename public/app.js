// Grab the articles
// $.getJSON("/articles", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     $("#articles").append("<p data-id=" + data[i]._id+">" + data[i].title + "<br />" + data[i].link + "</p><hr>");
//   }
// });

// Onclick event for tag
$(document).on("click", "p", function() {
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Ajax call to pull article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2> Notes </h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append(`  <h2>comment</h2> <div id="commentLog"></div>`)

      // If there's a note in the article
      if (data.note) {
        var comentLogDOM = $("#commentLog")
        for(var i = 0; i < data.note.length; i++){
          var pTitle = $("<h2>").append(data.note[i].title);
          var pComment = $("<p>").append(data.note[i].comment);
          comentLogDOM.append(pTitle).append(pComment).append($("<hr>"))
        }

        

        // $("#titleinput").val(data.note[0].title);
        // $("#bodyinput").val(data.note[0].comment);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      comment: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  // Remove the values entered
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
