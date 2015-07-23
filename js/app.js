var currentToken;

$(document).ready(function($) {

  //populate all Primary texts and their Suggested texts
  getPtexts();

  // hide and show learn more
  $('#learnmore-btn').click(function(event) {
    event.preventDefault();
    $('.learnmore').toggleClass('hidden');
  });

  //hide and show the Primary text posting form
  $('.createPtext').click(function() {
    $('.createtext').toggleClass('hidden');
  });

  $('.loginNav').on('click', function() {
    $('.login').toggleClass('hidden');
  });

  //prevent document default link action
  $('#ptexts').on('click', 'a', function(event) {
    event.preventDefault();
  });

  //AJAX for creating user token on login
  $('#loginBtn').on('click', login);
  //AJAX for registering a new user
  $('#register').on('click', function() {
    $.ajax('https://murmuring-wave-7389.herokuapp.com/register', {
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify({
        credentials: {
          name: $('#signup-username').val(),
          image: 'http://strawberry.com',
          email: $('#signup-email').val(),
          password: $('#signup-password').val()
        }
      }),
    }).done(function(data, textStatus) {
      console.log(data);
      $('.cd-user-modal').removeClass('is-visible');
      $('#ptexts').empty();
      $('#user-name').html('');
      $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + data['name']);
    }).fail(function(jqxhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
  });
}); // end document ready
