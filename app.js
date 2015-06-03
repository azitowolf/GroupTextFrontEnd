jQuery(document).ready(function($){

//ptext HTML
var makePtext = function(id, title, history, text, location){ $(location).append("<div class='media'><div class='media-left'><a class='expand' href='#'><img class='media-object' src='http://www.nnsheriff.org/img/placeholder/blogpost-placeholder-100x100.png' alt='...'></a></div><div class='media-body ptext' id=" + id + "><h4 class='media-heading'>" + title + "</h4>" + "<p>" + history + "</p><p>" + text + "</p><div class ='stexts hidden'></div></div></div>");};

//stext HTML
var makeStext = function(title, text, votes){
  var html = "<div class='media'><div class='media-left'><a class='expand' href='#'><img class='media-object' src='http://www.nnsheriff.org/img/placeholder/blogpost-placeholder-100x100.png' alt='...'></a></div><div class='media-body ptext'><h4 class='media-heading'>" + title + "</h4><p>" + text + " Votes: " + votes + "</p><div class ='stexts'></div></div></div>";
  return html;
};

//stextForm HTML
var stextForm = "<div class='media'><div class='media-left'><a class='showNewStext' href='#'><img class='media-object' src='http://www.nnsheriff.org/img/placeholder/blogpost-placeholder-100x100.png' alt='...'></a></div><div class='media-body'><div class='newStext hidden'><input type='text' class='form-control' id='textTitle' placeholder='Text Title'></input><textarea type='text' class='form-control' id='textHistory' placeholder='Enter Text Body'></textarea> <a href='#' id='new-post-button' class='btn btn-success'>Post</a> </div></div></div>";

//getStexts -get all stexts for current ptext
  function getStexts(id, location){
      $.ajax({
      url: 'http://localhost:3000/ptexts/' + id + "/stexts",
      type: 'GET',
      dataType: 'json'
    }).done(function(contents) {
      console.log(contents);
      contents.stexts.forEach(function(val){
        location.append(makeStext(val.title, val.text, val.votes));
      });
    }).fail(function() {
      console.log("error");
    });
}

//AJAX request for all ptexts
  $.ajax({
    url: 'http://localhost:3000/ptexts',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(contents) {
    console.log(contents);
    contents.ptexts.forEach(function(val){
//make the ptexts
      makePtext(val.id, val.title, val.history, val.text, $('#ptexts'));

//get all stexts for ptext with current id and append to current id
      var $ID = $('#'+ val.id + ' .stexts');
      getStexts(val.id, $ID);

//add fake stext form for creating new stext
      $ID.append(stextForm);

//add functionality to the createStext buttons
      $('.showNewStext').click(function(event){
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
  })
  .always(function() {
    console.log("complete");
//END AJAX REQUEST
  });

//create new stext
  $('#ptexts').on('click', '#new-post-button', function(event){
    event.preventDefault();
    var $t = event.target;
    var targetTitle = $($t).siblings("#textTitle");
    var targetHistory = $($t).siblings("#textHistory");
    var targetID = $($t).parent().parent().parent().parent().parent().attr('id');
    $.ajax({
      url: 'http://localhost:3000/ptexts/' + targetID + "/stexts",
      type: 'POST',
      dataType: 'json',
      data: {stext: {user:"user", title:targetTitle.val(), text:targetHistory.val(), votes:0}}
    })
    .done(function(item) {
        var newS = makeStext(item.title, item.text, item.votes);
        $($t).parent().parent().parent().parent().parent().append(newS);
          var targetTitle = $($t).siblings("#textTitle").val("");
          var targetHistory = $($t).siblings("#textHistory").val("");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  });

// hide and show learn more
$('#go-button').click(function(event) {
  event.preventDefault();
  $('.learnmore').toggleClass('hidden');
});

//hide and show the Ptext posting form
$('.menu-3').click(function(){
  $('.createtext').toggleClass('hidden');
});

// Button for creating a new Ptext
$('#new-post-button').click(function(event) {

        $.ajax({
          url: 'http://localhost:3000/ptexts',
          type: 'POST',
          dataType: 'json',
          data: {ptext: {title: $('#ptextTitle').val(), history: $('#textHistory').val(), text: $('#currentText').val()}}
        })
        .done(function(contents) {
          console.log(contents);
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });
});

$('.loginNav').on('click', function(){
  $('.login').toggleClass('hidden');
});

$('#ptexts').on('click', 'a', function(event){
  event.preventDefault();
});

$(function(){
  $('#get-token').on('click', function(){
    $.ajax('http://localhost:3000/login',{
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#email').val(),
          password: $('#password').val()
        }
      }),
      dataType: "json",
      method: "POST"
    }).done(function(data, textStatus) {
      $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
    });
  });
  $('#get-index').on('click', function(){
    $.ajax('http://localhost:3000/hello',{
      dataType: "json",
      method: "GET",
      headers: { Authorization: 'Token token=' + $("#token").val() }
    }).done(function(data, textStatus) {
      $('#result').val(JSON.stringify(data));
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
    });
  });
  $('#get-by-id').on('click', function(){
    $.ajax('http://localhost:3000/hello/' +
      $('#id').val(), {
      dataType: "json",
      method: "GET",
      headers: { Authorization: 'Token token=' + $("#token").val() }
    }).done(function(data, textStatus) {
      $('#result').val(JSON.stringify(data));
      console.log(data);
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(textStatus);
    });
  });
});

// end document ready
});





