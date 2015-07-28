var currentToken;
var path = 'http://localhost:3000';
var auth = authIIFE;

function init() {
  //Check localstorage for a user token
  auth.session();
  //Populate all Primary texts and their Suggested texts
  getPtexts();
  //AJAX for creating user token on login
  $('#loginBtn').on('click', auth.login);
  //AJAX for registering a new user
  $('#register').on('click', auth.register);

  //Hide and show buttons
  $('#learnmore-btn').click(function(event) {
    event.preventDefault();
    $('.learnmore').toggleClass('hidden');
  });
  //Primary text posting form
  $('.createPtext').click(function() {
    $('.createtext').toggleClass('hidden');
  });
  //loginModal
  $('.loginNav').on('click', function() {
    $('.login').toggleClass('hidden');
  });
  //prevent document default link actions
  $('#ptexts').on('click', 'a', function(event) {
    event.preventDefault();
  });

  $('input[name="file"]').on('change', function(e) {
    readURL(this);
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onloadend = function(e) {
        console.log(e.target.result);
        $('#image-preview').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
}

$(document).ready(function($) {
  init();
});
