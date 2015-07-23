
var login = function(){
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
      window.localStorage.setItem("TOKEN", data['token']);
      console.log(data);
      $('.cd-user-modal').removeClass('is-visible');
      $('#ptexts').empty();
      $('#user-name').html('');
      $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + data['name']);
      getPtexts();
    }).fail(function(jqxhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
  }

  var register = function() {
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
  }
