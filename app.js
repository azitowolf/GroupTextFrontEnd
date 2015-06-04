var currentToken;

$(document).ready(function($){

//populate all Primary texts and their Suggested texts
  getPtexts();

// hide and show learn more
$('#go-button').click(function(event) {
  event.preventDefault();
  $('.learnmore').toggleClass('hidden');
});

//hide and show the Ptext posting form
  $('.menu-3').click(function(){
    $('.createtext').toggleClass('hidden');
  });

$('.loginNav').on('click', function(){
  $('.login').toggleClass('hidden');
});

//prevent document default link action
$('#ptexts').on('click', 'a', function(event){
  event.preventDefault();
});


//code for creating user token on login

    $('#get-token').on('click', function(){
      $.ajax('http://localhost:3000/login',{
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
          credentials: {
            email: $('#email').val(),
            password: $('#password').val()
          }
        }),
        dataType: "json",
        method: "POST"
      }).done(function(data, textStatus) {
        $('#token').val(textStatus == 'nocontent' ? 'login failed' : data['token']);
        currentToken = data['token'];
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log(textStatus);
      });
    });
    $('#get-index').on('click', function(){
      $.ajax('http://localhost:3000/hello',{
        dataType: "json",
        method: "GET",
        headers: { Authorization: 'Token token=' + $("#token").val()}
      }).done(function(data, textStatus) {
        $('#result').val(JSON.stringify(data));
        console.log(data);
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log(textStatus);
      });
    });
    $('#get-by-id').on('click', function(){
      $.ajax('http://localhost:3000/hello/' +
        $('#id').val(), {
        dataType: "json",
        method: "GET",
        headers: { Authorization: 'Token token=' + $("#token").val() }
      }).done(function(data, textStatus) {
        $('#result').val(JSON.stringify(data));
        console.log(data);
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log(textStatus);
      });
    });

// end document ready
});





