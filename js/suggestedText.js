//SUGGESTEDTEXT.js
// User should be able to see all stexts
// User should be able to delete stext
// User should be able to add stext

//render Stext HTML
  var makeStext = function(id, user, text, votes){
    var html = "<div class='media stext' id='"+ id +"'><div class='media-left'><a class='expand' href='#'><div class='media-object voteCount'> </div></a></div><div class='media-body'><h4 class='media-heading'>" + user + "</h4> <div class='message left'><div class='message-text smsg'>" + text + "</div></div></p><div>Votes: <div id='votes'> " + votes + "<a href='#' id='sendStext' data-text='" + text + "''  class= 'sendStext btn btn-warning'> Send </a><a href='#' id='vote' class='btn btn-success'>Vote</a> </div></div></div></div>";
    return html;
  };

//getStexts -get all stexts for ptext with ID
  function getStexts(id, location, owned){
      $.ajax({
      url: 'http://localhost:3000/ptexts/' + id + "/stexts",
      type: 'GET',
      dataType: 'json'
    }).done(function(contents) {
      contents.stexts.forEach(function(val){
        location.append(makeStext(val.id, val.user.name, val.text, val.virtual));
    if (!owned){
      $('#ptext' + id + ' .sendStext').addClass('hidden');
    }

      });
    }).fail(function() {
      console.log("error");
    });
}

$(document).ready(function(){
//create new Stext and render it in the DOM
  $('#ptexts').on('click', '.send-btn', function(event){
    event.preventDefault();
    var $t = event.target;
    var targetText = $($t).siblings('#msgInput').val();
    var targetID = $($t).closest('.ptext').attr('data-attr');
    $.ajax({
      url: 'http://localhost:3000/ptexts/' + targetID + "/stexts",
      type: 'POST',
      headers: { Authorization: 'Token token=' + currentToken},
      dataType: 'json',
      data: {stext: {text:targetText}}
    })
    .done(function(item) {
        var newS = makeStext(item.stext.id, item.stext.user.name, item.stext.text, item.stext.virtual);
        console.log(item)
        $($t).parent().parent().parent().siblings('.stexts').append(newS);
        $($t).parent().parent().parent().siblings('.stexts').removeClass('hidden');
        //   var targetTitle = $($t).siblings("#textTitle").val("");
        //   var targetHistory = $($t).siblings("#textHistory").val("");
    })
    .fail(function(XMLHttpRequest) {
      console.log(XMLHttpRequest);
      if (XMLHttpRequest.status === 401){
        $('.cd-user-modal').addClass('is-visible')
      }
    })
    .always(function() {
      console.log("complete");
    });

  });

// vote function
  $('#ptexts').on('click', '#vote', function(){
    var $t = event.target;
    var ptextID = $($t).closest('.ptext').attr('id');
    var stextID = $($t).closest('.stext').attr('id');

    $.ajax({
      url: 'http://localhost:3000/ptexts/' + ptextID + '/stexts/' + stextID + '/vote',
      type: 'POST',
      dataType: 'json',
      headers: { Authorization: 'Token token=' + currentToken}
    })
    .done(function(data) {
      console.log(data);
      $('#' + stextID + " #votes").html('');
      $('#' + stextID + " #votes").append(data);
    })
    .fail(function(XMLHttpRequest) {
        if (XMLHttpRequest.status === 401){
          $('.cd-user-modal').addClass('is-visible')
        }
    });

  });

//send texts
$('#ptexts').on('click', '#sendStext', function(){
var t = $(this)
  $.ajax({
    url: 'http://localhost:3000/sendMsg',
    type: 'POST',
    headers: { Authorization: 'Token token=' + currentToken},
    dataType: 'json',
    data:{number:"6172762096", text:$(t).attr('data-text')}
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })


})
//end document ready
});
