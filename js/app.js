// APP.JS
// User Login
// User click functionality

var currentToken;

$(document).ready(function($) {

  //populate all Primary texts and their Suggested texts
  getPtexts();

  // hide and show learn more
  $('#go-button').click(function(event) {
    event.preventDefault();
    $('.learnmore').toggleClass('hidden');
  });

  //hide and show the Primary text posting form
  $('.menu-3').click(function() {
    $('.createtext').toggleClass('hidden');
  });

  $('.loginNav').on('click', function() {
    $('.login').toggleClass('hidden');
  });

  //prevent document default link action
  $('#ptexts').on('click', 'a', function(event) {
    event.preventDefault();
  });

  //code for creating user token on login

  $('#loginBtn').on('click', function() {
    $.ajax('https://murmuring-wave-7389.herokuapp.com/login', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#signin-email').val(),
          password: $('#signin-password').val()
        }
      }),
      dataType: "json",
      method: "POST"
    }).done(function(data) {
      currentToken = data['token'];
      console.log(data)
      $('.cd-user-modal').removeClass('is-visible')
      $('#ptexts').empty();
      $('#user-name').html('');
      $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + data['name']);
      getPtexts();
    }).fail(function(jqxhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
  });
  //   $('#get-index').on('click', function(){
  //   $.ajax('http://localhost:3000/hello',{
  //     dataType: "json",
  //     method: "GET",
  //     headers: { Authorization: 'Token token=' + currentToken}
  //   }).done(function(data, textStatus) {
  //     $('#result').val(JSON.stringify(data));
  //     console.log(data);
  //   }).fail(function(jqxhr, textStatus, errorThrown){
  //     console.log(textStatus);
  //   });
  // });
  // end document ready
});
