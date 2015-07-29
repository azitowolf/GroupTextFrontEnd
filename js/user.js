//USER.JS

var userIIFE = (function() {

  saveLocalData = function(user) {
    localStorage.clear();
    currentToken = user.token;
    window.localStorage.setItem("TOKEN", user.token);
    window.localStorage.setItem("USER", user.name);
    window.localStorage.setItem("AVATAR", user.avatar);
  };

  updateUserPage = function(user) {
    $('.cd-user-modal').removeClass('is-visible');
    $('#ptexts').empty();
    $('#user-name').html('');
    $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + user.name);
    $('#userProfileImage').attr('src', user.avatar);
  };

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
      saveLocalData(data);
      updateUserPage(data);
      getPtexts();
    }).fail(function(jqxhr, textStatus, errorThrown) {
      // show error message in modal
      $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass(
        'is-visible');
      $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass(
        'is-visible');
    });
  };

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
        }
      }),
    }).done(function(data, textStatus) {
      saveLocalData(data);
      updateUserPage(data);
    }).fail(function(jqxhr, textStatus, errorThrown) {
      console.log(textStatus);
    });
  };

  var session = function() {
    currentToken = window.localStorage.getItem("TOKEN");
    var sessionName = window.localStorage.getItem("USER");
    var sessionToken = window.localStorage.getItem("TOKEN");
    var sessionAvatar = window.localStorage.getItem("AVATAR");
    $('#ptexts').empty();
    $('#user-name').html('');
    $('#user-name').append('<span class="glyphicon glyphicon-user"></span>' + sessionName);
    $('#userProfileImage').attr('src', sessionAvatar);
  };

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        console.log(e.target.result);
        $('#image-preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  return {
    login: login,
    register: register,
    session: session,
    readURL: readURL
  };

})();
