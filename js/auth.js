
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
