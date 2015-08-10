//PRIMARYTEXT.js

var stext = stextIIFE; //importing functions from stexts.js
var ptextIIFE = (function(stext) {

  _makePtext = function(id, avatar, user, text) {
    var html = "<div data-attr='" + id + "' class='media ptext' id='ptext" + id +
      "'><div class='media-left'><a class='expand' href='#'><img src = '" + avatar +
      "' class='media-object profile'></a></div><div class='media-body'><h2 class='media-heading'>" +
      user +
      "<a href='#' id=deletePtext class= 'btn btn-danger'> Delete </a> </h2><p><div class='phone-containter'><div id='phone' class='phone'><div class='message left'><div class='message-text'></div></div><div class='message right'><div class='message-text'>!</div><div class='message-text'></div></div><div class='message left'><div class='message-text'></div></div></div><div class='send-container'><form id='send'><textarea rows='2' type='text' id='msgInput' class='send-input'>" +
      text +
      "</textarea><input type='submit' class='send-btn' value='Send'></form></div></div></p><div class ='stexts hidden'></div></div></div>";
    return html;
  }; // Render Function

  var getPtexts = function() {
    $.ajax({
      url: path + '/ptexts',
      type: 'GET',
      headers: {
        Authorization: 'Token token=' + currentToken
      },
      dataType: 'json'
    })
      .done(function(contents) {
        contents.ptexts.forEach(function(val) {
          $('#ptexts').append(_makePtext(val.id, val.user.avatar, val.user.name, val.text));
          parseText(val.history, val.id);

          function isOwnedByUser() {
            if (val.user.token !== currentToken) {
              $('#ptext' + val.id + ' #deletePtext').hide();
              return false;
            } else {
              return true;
            }
          }
          var $stextDiv = $('#ptext' + val.id + ' .stexts');
          stext.getStexts(val.id, $stextDiv, isOwnedByUser());
        });
        $('#loader-wrapper').fadeOut(300);
      })
      .fail(function() {
        console.log("error");
      });
  }; // Get P texts

  var createPtext = function(event) {
    event.preventDefault();
    $.ajax({
      url: path + '/ptexts',
      type: 'POST',
      headers: {
        Authorization: 'Token token=' + currentToken
      },
      dataType: 'json',
      data: {
        ptext: {
          history: $('#textHistory').val(),
          text: $('#currentText').val(),
          number: $('#recipientNumber').val(),
          avatar: window.localStorage.getItem("AVATAR")
        }
      }
    })
      .done(function(contents) {
        console.log(contents);
        var newP = _makePtext(contents.ptext.id, window.localStorage.getItem("AVATAR"), contents.ptext.user.name,
          contents.ptext.text);
        $('#ptexts').append(newP);
        parseText(contents.ptext.history, contents.ptext.id);
        $('.createtext').toggleClass('hidden');
        $('#smallModal').removeClass('hidden');
      })
      .fail(function(XMLHttpRequest) {
        if (XMLHttpRequest.status === 401) {
          $('.cd-user-modal').addClass('is-visible');
        }
      });
  }; // Create P texts

  var deletePtext = function() {
    var $id = $(this).closest('.ptext').attr('data-attr');
    var t = $(this);
    $.ajax({
      url: path + '/ptexts/' + $id,
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
      });
  }; // Delete P texts

  return {
    getPtexts: getPtexts,
    deletePtext: deletePtext,
    createPtext: createPtext
  }; //Export functions

})(stext);
