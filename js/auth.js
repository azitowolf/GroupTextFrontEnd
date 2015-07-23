
var authIIFE = (function() {
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
      window.localStorage.setItem("USER", data['name']);
      console.log(data);
      $('.cd-user-modal').removeClass('is-visible');
      $('#ptexts').empty();
      $('#user-name').html('');
      $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + data['name']);
      getPtexts();
    }).fail(function(jqxhr, textStatus, errorThrown) {
        // show error message in modal
        var $form_modal = $('.cd-user-modal'),
        $form_login = $form_modal.find('#cd-login'),
        $form_signup = $form_modal.find('#cd-signup')
        $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass(
          'is-visible');
        $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass(
          'is-visible');
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
      currentToken = data['token'];
      window.localStorage.setItem("TOKEN", data['token']);
      window.localStorage.setItem("USER", data['name']);
      console.log(data);
      $('.cd-user-modal').removeClass('is-visible');
      $('#ptexts').empty();
      $('#user-name').html('');
      $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + data['name']);
    }).fail(function(jqxhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
  }

  var session = function() {
    var sessionName = window.localStorage.getItem("USER");
    var sessionToken = window.localStorage.getItem("TOKEN");
    $('#ptexts').empty();
    $('#user-name').html('');
    $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + sessionName);
  }

  return {
    login: login,
    register: register,
    session: session
  }

})();
