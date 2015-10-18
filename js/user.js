//USER.JS
var ptext = ptextIIFE;
var userIIFE = (function(ptext) {

  _saveLocalData = function(user) {

    currentToken = user.token;
    window.localStorage.setItem("TOKEN", user.token);
    window.localStorage.setItem("USER", user.name);
    window.localStorage.setItem("AVATAR", user.avatar);
  }; // Store user data locally

  _updateUserPage = function(user) {
    $('.cd-user-modal').removeClass('is-visible');
    $('#ptexts').empty();
    $('.dropdown').show();
    $('#user-name').html('');
    $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + user.name);
    $('#stage').css('height', '200px');
    $('#stage').css('background-image', 'url(' + user.avatar + ')');

  }; // Update page elements

  var login = function() {
    var $form_modal = $('.cd-user-modal'),
      $form_login = $form_modal.find('#cd-login'),
      $form_signup = $form_modal.find('#cd-signup');

    $.ajax(path + '/login', {
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
      console.log(data);
      _saveLocalData(data);
      _updateUserPage(data);
      ptext.getPtexts();
    }).fail(function(jqxhr, textStatus, errorThrown) {
      // show error message in modal
      $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass(
        'is-visible');
      $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass(
        'is-visible');
    });
  }; //Login

  var register = function() {
    $.ajax(path + '/register', {
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify({
        credentials: {
          name: $('#signup-username').val(),
          avatar: $('#image-preview').attr('src'),
          email: $('#signup-email').val(),
          password: $('#signup-password').val(),
          number: $('#signup-number').val()
        }
      }),
    }).done(function(data, textStatus) {
      console.log(data);
      // logout();
      _saveLocalData(data);
      _updateUserPage(data);
      ptext.getPtexts();
    }).fail(function(jqxhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
  }; // Register

  var logout = function() {
    $('#user-name').html('not logged in');
    $('#stage').css('height', '0px');
    $('.dropdown').hide();
    localStorage.clear();
    currentToken = "";
  }; // Logout

  var session = function() {
    currentToken = window.localStorage.getItem("TOKEN");
    var sessionName = window.localStorage.getItem("USER") || 'not logged in';
    var sessionToken = window.localStorage.getItem("TOKEN");
    var sessionAvatar = window.localStorage.getItem("AVATAR");

    $('#user-name').html('');
    $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + sessionName);
    if(sessionAvatar){
      $('#stage').css('background-image', 'url(' + sessionAvatar + ')');
      $('#stage').css('height', '200px');
    }
  }; // Retrieve session variables

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        console.log(e.target.result);
        $('#image-preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  } // Encode image for storage

  return {
    login: login,
    register: register,
    session: session,
    logout: logout,
    readURL: readURL
  };

})(ptext);
