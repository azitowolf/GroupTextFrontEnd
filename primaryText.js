
//render ptext HTML
var makePtext = function(id, title, history, text, user){var html = "<div class='media'><div class='media-left'><a class='expand' href='#'><img class='media-object' src='http://www.nnsheriff.org/img/placeholder/blogpost-placeholder-100x100.png' alt='...'></a></div><div class='media-body ptext' id=" + id + "><h4 class='media-heading'>" + title + "</h4><h5>"+ user + "</h5>" + "<p>" + history + "</p><p>" + text + "</p><div class ='stexts hidden'></div></div></div>";
  return html;
};

//AJAX request for all ptexts
function getPtexts(){
  $.ajax({
    url: 'http://localhost:3000/ptexts',
    type: 'GET',
    headers: { Authorization: 'Token token=' + currentToken},
    dataType: 'json'
  })
  .done(function(contents) {
    console.log(contents);
    contents.ptexts.forEach(function(val){

//make the ptexts
  $('#ptexts').append(makePtext(val.id, val.title, val.history, val.text, val.user.email));
    var $ID = $('#'+ val.id + ' .stexts');

//get all stexts for ptext with current id and append to current id
      getStexts(val.id, $ID);

//add fake stext form for creating new stext
      $ID.append(stextForm);

//add functionality to the createStext buttons
      $('#ptexts').on('click', '.showNewStext', function(event){
       event.preventDefault();
      $(this).parents().siblings('.media-body').children('.newStext').toggleClass('hidden');
      });
  });

//add click functionality to the ptexts
  $('.expand').click(function(event) {
    event.preventDefault();
    $(this).parents().siblings('.media-body').children('.stexts').toggleClass('hidden');
  });
  //end done function
  })
  .fail(function() {
    console.log("error");
  });

//END AJAX REQUEST

}

$(document).ready(function(){

// Button for creating a new Ptext
  $('#new-post-button').click(function(event) {
    event.preventDefault();
      $.ajax({
        url: 'http://localhost:3000/ptexts',
        type: 'POST',
        headers: { Authorization: 'Token token=' + currentToken},
        dataType: 'json',
        data: {ptext: {title: $('#ptextTitle').val(), history: $('#textHistory').val(), text: $('#currentText').val()}
      }
      })
      .done(function(contents) {
        console.log(contents);
        var newP = makePtext(contents.ptext.id, contents.ptext.title, contents.ptext.history, contents.ptext.text, contents.ptext.user.email);
        $('#ptexts').append(newP);
      })
      .fail(function() {
      if (XMLHttpRequest.status === 401){
        alert('login to do that');
      }
      })
  });


//end doc ready
});
