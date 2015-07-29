//SUGGESTEDTEXT.js

var stextIIFE = (function() {

  _makeStext = function(id, user, avatar, text, votes) {
    var html = "<div class='media stext' id='" + id +
      "'><div class='media-left'><a class='expand' href='#'><img src='" + avatar +
      "' class='media-object voteCount'></a></div><div class='media-body'><h4 class='media-heading'>" +
      user + "</h4> <div class='message left'><div class='message-text smsg'>" + text +
      "</div></div></p><div>Votes: <div id='votes'> " + votes +
      "<a href='#' id='vote' class='btn btn-success'>Vote</a> <a href='#' id='deleteStext' class='btn btn-danger'>Delete</a> <a href='#' id='sendStext' data-text='" +
      text +
      "''  class= 'sendStext btn btn-warning'> Send </a></div></div></div></div>";
    return html;
  };

  //getStexts -get all stexts for ptext with ID
  var getStexts = function(id, location, owned) {
    $.ajax({
      url: heroku + '/ptexts/' + id + "/stexts",
      type: 'GET',
      dataType: 'json'
    }).done(function(contents) {
      contents.stexts.forEach(function(val) {
        location.append(_makeStext(val.id, val.user.name, val.user.avatar, val.text, val.virtual));
        if (!owned) {
          $('#ptext' + id + ' .sendStext').addClass('hidden');
          $('#ptext' + id + ' .deleteStext').addClass('hidden');
        }

      });
    }).fail(function() {
      console.log("error");
    });
  };

  var createStext = function(event) {
    event.preventDefault();
    var $t = event.target;
    var targetText = $($t).siblings('#msgInput').val();
    var targetID = $($t).closest('.ptext').attr('data-attr');
    $.ajax({
      url: heroku + '/ptexts/' + targetID + "/stexts",
      type: 'POST',
      headers: {
        Authorization: 'Token token=' + currentToken
      },
      dataType: 'json',
      data: {
        stext: {
          text: targetText,
          avatar: window.localStorage.getItem("AVATAR")
        }
      }
    })
      .done(function(item) {
        var newS = _makeStext(item.stext.id, item.stext.user.name, window.localStorage.getItem("AVATAR"), item.stext.text, item.stext
          .virtual);
        console.log(newS);
        $($t).parent().parent().parent().siblings('.stexts').append(newS);
        $($t).parent().parent().parent().siblings('.stexts').removeClass('hidden');
        //   var targetTitle = $($t).siblings("#textTitle").val("");
        //   var targetHistory = $($t).siblings("#textHistory").val("");
      })
      .fail(function(XMLHttpRequest) {
        console.log(XMLHttpRequest);
        if (XMLHttpRequest.status === 401) {
          $('.cd-user-modal').addClass('is-visible');
        }
      })
      .always(function() {
        console.log("complete");
      });
  };



  var vote = function() {
    var $t = event.target;
    var ptextID = $($t).closest('.ptext').attr('id');
    var stextID = $($t).closest('.stext').attr('id');

    $.ajax({
      url: 'https://murmuring-wave-7389.herokuapp.com/ptexts/' + ptextID + '/stexts/' +
        stextID + '/vote',
      type: 'POST',
      dataType: 'json',
      headers: {
        Authorization: 'Token token=' + currentToken
      }
    })
      .done(function(data) {
        console.log(data);
        $('#' + stextID + " #votes").html('');
        $('#' + stextID + " #votes").append(data);
      })
      .fail(function(XMLHttpRequest) {
        if (XMLHttpRequest.status === 401) {
          $('.cd-user-modal').addClass('is-visible');
        }
      });
  };



  var deleteStext = function() {
    var $id = $(this).closest('.stext').attr('id');
    var t = $(this);
    $.ajax({
      url: heroku + '/ptexts/' + $(this).closest('.ptext').attr('data-attr') + '/stexts/' + $id,
      headers: {
        Authorization: 'Token token=' + currentToken
      },
      type: 'DELETE',
      dataType: 'json',
    })
      .done(function() {
        console.log("success");
        $(t).closest('.stext').toggleClass('hidden');
      })
      .fail(function() {
        console.log("error");
      });
  };



  var sendStext = function() {
    var t = $(this);
    $.ajax({
      url: heroku + '/sendMsg',
      type: 'POST',
      headers: {
        Authorization: 'Token token=' + currentToken
      },
      dataType: 'json',
      data: {
        number: "6172762096",
        text: $(t).attr('data-text')
      }
    })
      .done(function() {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      });
  };

  return {
    getStexts: getStexts,
    createStext: createStext,
    vote: vote,
    deleteStext: deleteStext,
    sendStext: sendStext
  };

})();
