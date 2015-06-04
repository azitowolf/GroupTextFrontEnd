//render Stext HTML
var makeStext = function(title, text, votes){
  var html = "<div class='media'><div class='media-left'><a class='expand' href='#'><img class='media-object' src='http://www.nnsheriff.org/img/placeholder/blogpost-placeholder-100x100.png' alt='...'></a></div><div class='media-body ptext'><h4 class='media-heading'>" + title + "</h4><p>" + text + " Votes: " + votes + "</p><div class ='stexts'></div></div></div>";
  return html;
};

//render form to create new Stext
var stextForm = "<div class='media'><div class='media-left'><a class='showNewStext' href='#'><img class='media-object' src='http://www.nnsheriff.org/img/placeholder/blogpost-placeholder-100x100.png' alt='...'></a></div><div class='media-body'><div class='newStext hidden'><input type='text' class='form-control' id='textTitle' placeholder='Text Title'></input><textarea type='text' class='form-control' id='textHistory' placeholder='Enter Text Body'></textarea> <a href='#' id='new-post-button' class='btn btn-success'>Post</a> </div></div></div>";

//getStexts -get all stexts for current ptext
  function getStexts(id, location){
      $.ajax({
      url: 'http://localhost:3000/ptexts/' + id + "/stexts",
      type: 'GET',
      dataType: 'json'
    }).done(function(contents) {
      contents.stexts.forEach(function(val){
        location.append(makeStext(val.title, val.text, val.votes));
      });
    }).fail(function() {
      console.log("error");
    });
}
$(document).ready(function(){
//create new Stext
  $('#ptexts').on('click', '#new-post-button', function(event){
    event.preventDefault();
    var $t = event.target;
    var targetTitle = $($t).siblings("#textTitle");
    var targetHistory = $($t).siblings("#textHistory");
    var targetID = $($t).parent().parent().parent().parent().parent().attr('id');
    $.ajax({
      url: 'http://localhost:3000/ptexts/' + targetID + "/stexts",
      type: 'POST',
      headers: { Authorization: 'Token token=' + currentToken},
      dataType: 'json',
      data: {stext: {user:"user", title:targetTitle.val(), text:targetHistory.val(), votes:0}}
    })
    .done(function(item) {
        var newS = makeStext(item.title, item.text, item.votes);
        $($t).parent().parent().parent().parent().parent().append(newS);
          var targetTitle = $($t).siblings("#textTitle").val("");
          var targetHistory = $($t).siblings("#textHistory").val("");
    })
    .fail(function(XMLHttpRequest) {
      console.log(XMLHttpRequest);
      if (XMLHttpRequest.status === 401){
        alert('login to do that');
      }
    })
    .always(function() {
      console.log("complete");
    });

  });

});
