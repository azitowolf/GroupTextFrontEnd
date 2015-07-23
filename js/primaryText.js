//PRIMARYTEXT.js

//render ptext HTML
var makePtext = function(id, image, user, text) {
  var html = "<div data-attr='" + id + "' class='media ptext' id='ptext" + id + "'><div class='media-left'><a class='expand' href='#'><div class='media-object profile'></div></a></div><div class='media-body'><h2 class='media-heading'>" + user + "<a href='#' id=deletePtext class= 'btn btn-danger'> Delete </a> </h2><p><div class='phone-containter'><div id='phone' class='phone'><div class='message left'><div class='message-text'>Hello!</div></div><div class='message right'><div class='message-text'>Hi!</div><div class='message-text'>Where are you now?</div></div><div class='message left'><div class='message-text'>I'm at a party of Clara</div></div></div><div class='send-container'><form id='send'><textarea rows='2' type='text' id='msgInput' class='send-input'>" + text + "</textarea><input type='submit' class='send-btn' value='Send'></form></div></div></p><div class ='stexts hidden'></div></div></div>";
  return html;
};

//AJAX request for all ptexts
function getPtexts() {
  $.ajax({
    url: 'https://murmuring-wave-7389.herokuapp.com/ptexts',
    type: 'GET',
    headers: {
      Authorization: 'Token token=' + currentToken
    },
    dataType: 'json'
  })
    .done(function(contents) {
      contents.ptexts.forEach(function(val) {

        //make the ptexts
        $('#ptexts').append(makePtext(val.id, val.image, val.user.name, val.text));
        parseText(val.history, val.id);

        function isOwnedByUser() {
          if (val.user.token !== currentToken) {
            $('#ptext' + val.id + ' #deletePtext').hide();
            return false;
          } else {
            return true;
          }
        }

        //get all stexts for ptext with current id and append to current id
        var $stextDiv = $('#ptext' + val.id + ' .stexts');
        getStexts(val.id, $stextDiv, isOwnedByUser());

      });

      //end done function
    })
    .fail(function() {
      console.log("error");
    });

  //END AJAX REQUEST
}

//AJAX to delete ptext
$('#ptexts').on('click', '#deletePtext', function() {
  var $id = $(this).closest('.ptext').attr('data-attr');
  var t = $(this);
  $.ajax({
    url: 'https://murmuring-wave-7389.herokuapp.com/ptexts/' + $id,
    headers: {
      Authorization: 'Token token=' + currentToken
    },
    type: 'DELETE',
    dataType: 'json',
  })
    .done(function() {
      console.log("success");
      $(t).closest('.ptext').toggleClass('hidden');
    })
    .fail(function() {
      console.log("error");
    })
})

// waiting for dom to load before applying click action
$(document).ready(function() {

  // Button for creating a new Ptext
  $('#new-post-button').click(function(event) {
    event.preventDefault();
    $.ajax({
      url: 'https://murmuring-wave-7389.herokuapp.com/ptexts',
      type: 'POST',
      headers: {
        Authorization: 'Token token=' + currentToken
      },
      dataType: 'json',
      data: {
        ptext: {
          history: $('#textHistory').val(),
          text: $('#currentText').val()
        }
      }
    })
      .done(function(contents) {
        console.log(contents);
        var newP = makePtext(contents.ptext.id, contents.ptext.image, contents.ptext.user.name,
          contents.ptext.text);
        $('#ptexts').append(newP);
        parseText(contents.ptext.history, contents.ptext.id);
        $('.createtext').toggleClass('hidden');
        $('#smallModal').removeClass('hidden');
      })
      .fail(function(XMLHttpRequest) {
        if (XMLHttpRequest.status === 401) {
          $('.cd-user-modal').addClass('is-visible')
        }
      });
  });

  //add click functionality to the ptexts
  $('#ptexts').on('click', '.expand', function(event) {
    event.preventDefault();
    $(this).parents().siblings('.media-body').children('.stexts').toggleClass('hidden');
  });

  //end doc ready
});
